class GerarSenhas{
    constructor(caracteres, letras, upperCase, numeros, ce){
        this.types = [
          this.caracteres = caracteres,
          this.letras = letras,
          this.upperCase = upperCase,
          this.numeros = numeros,
          this.ce = ce
        ]
        this.senha = document.querySelector('.senha');
    }

    // A função GetPropertysValues extrai os valores dos atributos (true ou false) dentro de types, exceto de caracteres (que é um número)
    // O for coloca os valores dos atributos dentro do array isChecked 
    // isCheckedReal tem os valores de todos os atributos exceto o de caracteres
    // A função head é chamada e cada um dos seus parâmetros são os índices do array isCheckedReal
    GetPropertysValues(){
      const isChecked = [];
      for(let i=0; i<this.types.length; i++) {
        isChecked.push(this.types[i]);
      }
      const isCheckedReal = isChecked.splice(1);
      this.head(isCheckedReal[0], isCheckedReal[1], isCheckedReal[2], isCheckedReal[3]);
    }

    /* Nesta função é feito o controle dos valores vindos dos atributos de types (true ou false) e de acordo
       com os estes valores um método é chamado e o valor por ele retornado é renderizado na tela, sendo este
       a combinação de um ou mais tipos de caracteres que formarão a senha
    */
    head(letras, uc, numeros, ce) {
      if(!(letras && numeros && uc && ce)) this.senha.innerHTML = "Ao menos uma opção deve ser selecionada";

      if(letras) this.senha.innerHTML = this.gerarCaracteres();
      if(uc) this.senha.innerHTML = this.gerarCaracteresMaiusculos();
      if(numeros) this.senha.innerHTML = this.gerarNumeros();
      if(ce) this.senha.innerHTML = this.gerarCE();

      if(letras && uc) this.senha.innerHTML = this.TwoCombination("upCase", "letters");
      if(letras && numeros) this.senha.innerHTML = this.TwoCombination("letters", "numbers");
      if(letras && ce) this.senha.innerHTML = this.TwoCombination("letters", "specials");
      if(uc && numeros) this.senha.innerHTML = this.TwoCombination("upCase", "numbers");
      if(uc && ce) this.senha.innerHTML = this.TwoCombination("upCase", "specials");
      if(numeros && ce) this.senha.innerHTML = this.TwoCombination("numbers", "specials");

      if(numeros && ce && letras) this.senha.innerHTML = this.ThreeCombination("numbers", "specials", "letters");
      if(numeros && ce && uc) this.senha.innerHTML = this.ThreeCombination("upCase", "specials", "numbers");
      if(letras && ce && uc) this.senha.innerHTML = this.ThreeCombination("upCase", "specials", "letters");
      if(numeros && uc && letras) this.senha.innerHTML = this.ThreeCombination("upCase", "numbers", "letters");

      if(letras && numeros && uc && ce) this.senha.innerHTML = this.FourCombination();
    }

    // Gerador de números aleatórios
    Aleatorios(min, max){   
      let r = Math.random() * (max - min) + min;   
      return Math.round(r);   
    }

    // Por meio do for são gerados números aleatórios. E a quantidade destes números varia de acordo com o valor do atributo caracteres (a quantidade de caracteres que a senha terá)
    // O array posicoes é preenchido com estes números aleatórios, que vão de 0 a 25
    /* no segundo for a variável senhaLetrasMinusculas recebe alguns índices do array alfa e estes índices são determinados pelos números aleatórios que estão no array posicoes. E a quan-
    -tidade de vezes que isso vai acontecer vai depender, mais uma vez, do valor do atributo caracteres
    */
    // O valor de senhaLetrasMinusculas é retornado com a combinação de índices do array alfa. A senha de caracteres aleatórios é gerada.
    // A mesma lógica descrita acima se aplica a todos os outros métodos que geram caracteres sem combinar os tipos dos mesmos
    gerarCaracteres(){
      const alfa = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
       "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      let senhaLetrasMinusculas = '';
      let posicoes = [];
      for(let i=0; i<this.types[0]; i++){
        posicoes.push(this.Aleatorios(0, 25));
      }

      for(let i=0; i<this.types[0]; i++){
        senhaLetrasMinusculas += alfa[posicoes[i]];
      }
      return senhaLetrasMinusculas;
    }

    gerarCaracteresMaiusculos(){
      let minusculas = this.gerarCaracteres();
      minusculas = minusculas.toUpperCase();
      return minusculas;
    } 
    
    gerarNumeros(){
      let numeros = [];
      for(let i=0; i<this.types[0]; i++){
        numeros.push(this.Aleatorios(0, 9));
      } 
      let numString = numeros.join('');
      return numString;
    }

    gerarCE(){
      const caracteresEspeciais = ["!", "@", "#", "$", "%", "&", "*", "?", "~", "^", "/", ";", ":"];
      let mostrarCE = '';
      let posicoes = [];
      for(let i=0; i<this.types[0]; i++){
        posicoes.push(this.Aleatorios(0, 12));
      }

      for(let i=0; i<this.types[0]; i++){
        mostrarCE += caracteresEspeciais[posicoes[i]];
      }
      return mostrarCE;
    }

    // Caso seja selecionado mais de um checkbox este método é chamado, e dois argumentos previamente definidos são enviados como parâmetros
    // Um switch case é feito com os argumentos para definir qual valor as variáveis t1 e t2 receberão
    // Depois disso os valores de t1 e t2 serão concatenados na variável combination
    /* O array posicoes receberá números aleatórios de acordo com o valor do atributo caracteres, assim como ocorre na geração dos caracteres
       aleatórios com a diferença de que o valor máximo a ser gerado pelos aleatórios será o valor de caracteres multiplicado por 2, devido à
       concatenação dos dois valores das variáveis t1 e t2 que terão a mesma quantidade de caracteres. E isso acontece para que a geração de senhas
       não se tornasse previsível por causa do número máximo aleatório gerado que seria inferior à quantidade de índices do array posicoes
       (o -1 foi colocado por causa da contagem de índices de arrays, que começa em 0)
    */
   // Por fim a variável def vai receber a combinação de caracteres vindo cada um de uma posição aleatória até que chegue ao valor enviado ao atributo caracteres
    TwoCombination(type1, type2) {
      let t1 = '';
      let t2 = '';
      let combination = '';
      let def = '';

      switch(type1) {
        case "specials": 
        t1 = this.gerarCE();
        break;
        case "letters":
        t1 = this.gerarCaracteres();
        break;
        case "numbers":
        t1 = this.gerarNumeros();
        break;
        case "upCase":
        t1 = this.gerarCaracteresMaiusculos();
        break;
      }

      switch(type2) {
        case "specials": 
        t2 = this.gerarCE();
        break;
        case "letters":
        t2 = this.gerarCaracteres();
        break;
        case "numbers":
        t2 = this.gerarNumeros();
        break;
        case "upCase":
        t2 = this.gerarCaracteresMaiusculos();
        break;
      }

      combination = t1 + t2;
      
      let posicoes = [];
      for(let i=0; i<this.types[0]; i++){
        posicoes.push(this.Aleatorios(0, this.types[0]*2-1));
      }

      for(let i=0; i<this.types[0]; i++){
        def += combination[posicoes[i]];
      }
      return def;
    }

    /* Neste método a lógica é exatamente a mesma do método acima com as únicas diferenças sendo: um parâmetro a mais, 
       uma variável a mais para ser concatenada em combination e a multiplicação por 3 do número máximo aletório gerado
    */
    ThreeCombination(type1, type2, type3) {
      let t1 = '';
      let t2 = '';
      let t3 = '';
      let combination = '';
      let def = '';

      switch(type1) {
        case "specials": 
        t1 = this.gerarCE();
        break;
        case "letters":
        t1 = this.gerarCaracteres();
        break;
        case "numbers":
        t1 = this.gerarNumeros();
        break;
        case "upCase":
        t1 = this.gerarCaracteresMaiusculos();
        break;
      }

      switch(type2) {
        case "specials": 
        t2 = this.gerarCE();
        break;
        case "letters":
        t2 = this.gerarCaracteres();
        break;
        case "numbers":
        t2 = this.gerarNumeros();
        break;
        case "upCase":
        t2 = this.gerarCaracteresMaiusculos();
        break;
      }

      switch(type3) {
        case "specials": 
        t3 = this.gerarCE();
        break;
        case "letters":
        t3 = this.gerarCaracteres();
        break;
        case "numbers":
        t3 = this.gerarNumeros();
        break;
        case "upCase":
        t3 = this.gerarCaracteresMaiusculos();
        break;
      }

      combination = t1 + t2 + t3;
      
      let posicoes = [];
      for(let i=0; i<this.types[0]; i++){
        posicoes.push(this.Aleatorios(0, this.types[0]*3-1));
      }

      for(let i=0; i<this.types[0]; i++){
        def += combination[posicoes[i]];
      }
      return def;
    }

    // Este método é chamado somente quando as 4 checkbox estão marcadas
    // A variável four recebe diretamente os valores gerados pelos 4 métodos que geram caracteres aleatórios (que não combinam os tipos de caracteres)
    // A lógica é a mesma dos outros dois métodos que combinam caracteres, diferindo somente na menor quantidade de variáveis e amultiplicação do valor aleatório máximo por 4
    FourCombination() {
      let four = this.gerarCaracteres() + this.gerarNumeros() + this.gerarCaracteresMaiusculos() + this.gerarCE();
      let def = '';

      let posicoes = [];
      for(let i=0; i<this.types[0]; i++){
        posicoes.push(this.Aleatorios(0, this.types[0]*4-1));
      }

      for(let i=0; i<this.types[0]; i++){
        def += four[posicoes[i]];
      }
      return def;
    }
}


const btn = document.querySelector(".btn");
const caracteres = document.querySelector(".caracteres");
const checkLetras = document.querySelector(".letras");
const chkNumeros = document.querySelector('#numeros');
const chkCE = document.querySelector("#caracteres_especiais");
const chkLetrasM = document.querySelector('#letrasM');

const chkTypes = [checkLetras, chkLetrasM, chkNumeros, chkCE];
const isChecked = [];

// Através do for abaixo é colocado no array isChecked os valores retornados dos elementos do DOM
/* A classe GerarSenhas é instanciada e o valor do input caracteres é enviado como primeiro parâmetro, vindo depois deste
   os parâmetros responsáveis pelos tipos de caracteres na classe
*/
/* Como são necessários somente os valores true e false para a classe, são colocados sempre em ordem no array isChecked para
   a ordem em que seus índices são enviados como argumentos esteja correta
*/
/* Uma condicional if é sempre feita no começo do método para que o número de índices true e false não dobre a cada clique
   e o funcionamento da classe e consequentemente de toda a página não seja prejudicado
*/
// Somente o método GetPropertysValues é necessário para o uso da classe
btn.addEventListener('click', function(){
  if(isChecked.length === chkTypes.length) {
    isChecked.length = false;
  }

  for(let i=0; i<chkTypes.length; i++) {
    isChecked.push(chkTypes[i].checked);
  }

  let gerarSenhas = new GerarSenhas(caracteres.value, isChecked[0], isChecked[1], isChecked[2], isChecked[3]);
  gerarSenhas.GetPropertysValues();
  });