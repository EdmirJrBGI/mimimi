const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:J35u5Cri5to@cluster0.gwnwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexão com o MongoDB estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra o processo caso não consiga conectar
  }
};

module.exports = connectDB;
