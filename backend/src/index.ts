// backend/src/index.ts
import app from './app';
import express from "express";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.use('/backend/public/uploads', express.static('uploads'));
