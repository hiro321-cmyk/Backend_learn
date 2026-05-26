const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware — tells Express to understand JSON and allow requests from frontend
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serves your HTML frontend

// ✅ Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ─────────────────────────────────────────────
// ROUTES (these are your API endpoints)
// ─────────────────────────────────────────────

// GET /api/notes → fetch all notes from database
app.get('/api/notes', async (req, res) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/notes → save a new note to database
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// DELETE /api/notes/:id → delete a note by its ID
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Note deleted!' });
});

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
