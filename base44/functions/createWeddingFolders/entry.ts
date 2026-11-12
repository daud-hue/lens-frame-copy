import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const FOLDER_MIME = 'application/vnd.google-apps.folder';

async function createFolder(name, parentId, accessToken) {
  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      mimeType: FOLDER_MIME,
      parents: parentId ? [parentId] : [],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Failed to create folder');
  return data;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { coupleNames, weddingDate, venue } = await req.json();

    if (!coupleNames || !weddingDate) {
      return Response.json({ error: 'coupleNames and weddingDate are required' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googledrive');

    // Root folder name e.g. "2024-06-15 — Alex & Jordan — Rosewood Manor"
    const rootName = [weddingDate, coupleNames, venue].filter(Boolean).join(' — ');

    // Create root folder
    const root = await createFolder(rootName, null, accessToken);

    // Sub-folder structure
    const subFolders = [
      { name: '01 — RAW Files', children: [] },
      { name: '02 — Edited', children: ['High Resolution', 'Web Resolution', 'Black & White'] },
      { name: '03 — Ceremony', children: ['Getting Ready', 'Processional', 'Vows & Rings', 'Recessional'] },
      { name: '04 — Reception', children: ['Cocktail Hour', 'Speeches & Toasts', 'First Dances', 'Cake Cutting', 'Open Dancing'] },
      { name: '05 — Portraits', children: ['Couple', 'Bridal Party', 'Family Formals', 'Details & Decor'] },
      { name: '06 — Venue & Ambiance', children: [] },
      { name: '07 — Client Delivery', children: ['Online Gallery Link', 'Print Release'] },
      { name: '08 — Contracts & Docs', children: [] },
    ];

    const createdFolders = [];

    for (const sf of subFolders) {
      const parent = await createFolder(sf.name, root.id, accessToken);
      createdFolders.push({ name: sf.name, id: parent.id });

      for (const child of sf.children) {
        const childFolder = await createFolder(child, parent.id, accessToken);
        createdFolders.push({ name: `${sf.name} / ${child}`, id: childFolder.id });
      }
    }

    return Response.json({
      success: true,
      rootFolder: { name: rootName, id: root.id },
      foldersCreated: createdFolders.length,
      driveUrl: `https://drive.google.com/drive/folders/${root.id}`,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});