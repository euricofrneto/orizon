const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Conexão com MongoDB
mongoose.connect('sua_url_do_mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modelo do Lead
const Lead = mongoose.model('Lead', {
    nome: String,
    email: String,
    telefone: String,
    dataRegistro: {
        type: Date,
        default: Date.now
    }
});

app.use(cors());
app.use(express.json());

// Rota para salvar leads
app.post('/api/leads', async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json({ message: 'Lead salvo com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar lead' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 