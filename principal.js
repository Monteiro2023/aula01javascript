/* tipos de variaveis:
const (constante = variável que não muda)
var (global = variável pode mudar em qualquer momento)
let (variável local funciona apenas dentro de um unico processo) */
/* Criando função para limpar formulário */    
const limparformulario = (endereco) =>
{
/* usado funcos do dom  (Documenet Object Model )*/
document.getElementById('endereco').value='';
document.getElementById('numero').value='';
document.getElementById('bairro').value='';
document.getElementById('cidade').value='';
document.getElementById('estado').value='';
}
/* popular o formulario */
const preencherformulario = (endereco) =>{
document.getElementById('endereco').value=endereco.logradouro;
document.getElementById('bairro').value=endereco.bairro;
document.getElementById('cidade').value=endereco.localidade;
document.getElementById('estado').value=endereco.uf;
}
/* validando o cep REXG */
const eNumero = (numero)=>/^[0-9]+$/;

/* validando se o cep tem 8 caracters  */
const cepvalido = (cep)=> cep.length == 8 && eNumero (numero);

    /* fazendo uma requisição para API viaCEP */      
    const pesquisacep = async() => {
        limparformulario();

        const cep = document.getElementById('cep').value.replace("-","");
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        /* verificando se o cep é valido */
        if(cepvalido(cep)){
            const dados = await fetch(url); 
            const endereco = await dados.json();

            if(endereco.hasOwnProperty('erro')){
               document.getElementById('endereco').value="Cep incorreto";
            }else{
                preencherformulario(endereco);
            }    
             
        }else{document.getElementById('endereco').value="Cep incorreto!";

        }   

}
document.getElementById('endereco')
.addEventListener('focusout', pesquisacep);