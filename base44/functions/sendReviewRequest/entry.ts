import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const inquiries = await base44.asServiceRole.entities.Inquiry.filter({});
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let sentCount = 0;

    for (const inquiry of inquiries) {
      if (!inquiry.event_date || inquiry.review_sent) continue;

      const eventDate = new Date(inquiry.event_date);
      if (eventDate > now) continue;
      if (eventDate < thirtyDaysAgo) continue;

      const reviewUrl = `${req.headers.get('origin') || 'https://lens-and-frame.app'}/review?name=${encodeURIComponent(inquiry.name)}&email=${encodeURIComponent(inquiry.email)}`;

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: inquiry.email,
        subject: 'How was your experience with Lens & Frame?',
        body: `Hi ${inquiry.name},\n\nThank you for choosing Lens & Frame for your ${inquiry.event_type} photography. We hope you loved the results!\n\nWe'd be incredibly grateful if you could take a moment to share your experience. Your testimonial helps future clients feel confident in choosing us.\n\nLeave a review here: ${reviewUrl}\n\nWith gratitude,\nThe Lens & Frame Team`
      });

      await base44.asServiceRole.entities.Inquiry.update(inquiry.id, { review_sent: true });
      sentCount++;
    }

    return Response.json({ success: true, reviewsSent: sentCount });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});