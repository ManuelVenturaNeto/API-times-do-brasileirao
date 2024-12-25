import tabela2024 from "./tabela.js";
import { modeloTime, modeloAtualizacaoTime } from "./validacao.js";
import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.status(200).send(tabela2024);
});

app.get('/:sigla', (req, res) => {
    const sigla_informada = req.params.sigla.toUpperCase();
    const time = tabela2024.find(time => time.sigla === sigla_informada);
    if(!time){
        res.status(404).send(`Status Code ${res.statusCode} \n Time não encontrado`);
        return;
    }
    res.status(200).send(time);
});

app.put('/:sigla', (req, res) => {
    const sigla_informada = req.params.sigla.toUpperCase();
    const time_selecionado = tabela2024.find(time_encontrado => time_encontrado.sigla === sigla_informada);
    if (!time_selecionado){
        res.status(404).send(`Status Code ${res.statusCode} \n Time não encontrado`);
        return;
      }
    const validacao_dados = modeloAtualizacaoTime.validate(req.body);
    if(validacao_dados.error){
        res.status(400).send(`Status Code ${res.statusCode} \n ${validacao_dados.error.details[0].message}`);
        return;
    }
    const campos =  Object.keys(req.body);
    for(let campo of campos){
        time_selecionado[campo] = req.body[campo];
    }
    res.status(200).send(req.body);
});

app.post('/', (req, res) => {
    const novoTime = req.body;
    const validacaoTime = modeloTime.validate(novoTime);
    if (validacaoTime.error) {
      res.status(400).send(`Status Code ${res.statusCode} \n ${validacaoTime.error.details[0].message}`);
      return;
    }
    tabela2024.push(novoTime);
    res.status(201).send(novoTime);
  });
  
app.delete('/:sigla', (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const indiceTimeSelecionado = tabela2024.findIndex(
      (t) => t.sigla === siglaInformada
    );
    if (indiceTimeSelecionado === -1) {
      res.status(404).send(`Status Code ${res.statusCode} \n Time não encontrado`);
      return;
    }
    const timeRemovido = tabela2024.splice(indiceTimeSelecionado, 1);
    res.status(200).send(timeRemovido);
  });

app.listen(8000, () => console.log("Servidor rodando com sucesso"));