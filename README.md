# Cadastro e carro

 **RF** => Requisitos funcionais
 Deve ser possível cadastrar um novo carro.

 **RN** => Regra de negocio
 Não deve ser possível cadastrar um carro com uma placa já existente.
 O carro deve ser cadastrado, por padrão, com disponibilidade.
 O usuário responsável pelo cadastro deve ser um usuário administrador

 # Listagem de categoriesRepository

 **RF**
 Deve ser possivel listar todos os carros disponíveis

 **RN**
 O usuário não precisar estar logado no sistema.

 # Cadastro de Expecificação no carro

 **RF**
 Deve ser possível cadastrar uma especificação para um carro.


 **RN**
 Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
 Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
 O usuário responsável pelo cadastro deve ser administrador

 # Cadastro de imagens do carro

 **RF**
 Deve ser possível cadastrar a imagem do carro.
 Deve ser possível listar todos os carros.

 **RNF**
 Utilizar o multer para upload dos arquivos.

 **RN**
 O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
 O usuário responsável pelo cadastro deve ser administrador.


 # Aluguel de carros

 **RF**
 Deve ser possível cadastrar um aluguel.

 **RN**
 O aluguel deve ter duração minima de 24 horas.
 Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
 Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
