# Teste WA

## Pré-requisitos
    - Ter instalado MySQL Workbench
    - Ter instalado Postman
    - Ter instalado Docker

## Imagem Docker do MySQL
    - docker pull mysql
    - Para criar o container:
        - docker run -p 3306:3306 -- TesteWA -e MYSQL_ROOT_PASSWORD=root -d mysql

## MySQL Workbench
    - Criar conexão:
        - hostname: localhost
        - port: 3306
        - user: root
        - password: root
    
    - Script Tabelas:

    -- -----------------------------------------------------
    -- Schema TesteWA
    -- -----------------------------------------------------
    CREATE SCHEMA IF NOT EXISTS `TesteWA` DEFAULT CHARACTER SET utf8 ;
    USE `TesteWA` ;

    -- -----------------------------------------------------
    -- Table `TesteWA`.`Exame`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `TesteWA`.`Exame` (
      `idExame` INT NOT NULL AUTO_INCREMENT,
      `Nome` VARCHAR(100) NOT NULL,
      `Tipo` VARCHAR(30) NOT NULL,
      `Status` VARCHAR(7) NOT NULL,
      PRIMARY KEY (`idExame`))

    -- -----------------------------------------------------
    -- Table `TesteWA`.`Laboratorio`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `TesteWA`.`Laboratorio` (
    `idLaboratorio` INT NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(100) NOT NULL,
    `Endereco` VARCHAR(200) NOT NULL,
    `Status` VARCHAR(7) NOT NULL,
    PRIMARY KEY (`idLaboratorio`))


    -- -----------------------------------------------------
    -- Table `TesteWA`.`LaboratoriosExames`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `TesteWA`.`LaboratoriosExames` (
      `idLaboratorio` INT NOT NULL,
      `idExame` INT NOT NULL,
      PRIMARY KEY (`idLaboratorio`, `idExame`),
      INDEX `fk_Laboratorio_has_Exame_Exame1_idx` (`idExame` ASC) VISIBLE,
      INDEX `fk_Laboratorio_has_Exame_Laboratorio1_idx` (`idLaboratorio` ASC) VISIBLE,
      CONSTRAINT `fk_Laboratorio_has_Exame_Exame1`
        FOREIGN KEY (`idExame`)
        REFERENCES `TesteWA`.`Exame` (`idExame`),
      CONSTRAINT `fk_Laboratorio_has_Exame_Laboratorio1`
        FOREIGN KEY (`idLaboratorio`)
        REFERENCES `TesteWA`.`Laboratorio` (`idLaboratorio`))

## Postman
    - Laboratório:
        - GET:
            - localhost:3000/laboratorios/buscar
            - localhost:3000/laboratorios/buscarPorId/{Id}
            - localhost:3000/laboratorios/buscarPorNome/{Nome}
            - localhost:3000/laboratorios/buscarPorEndereco/{Endereco}
            - localhost:3000/laboratorios/buscarPorStatus/{Status} (0 ou 1 ou inativo ou ativo)
        - POST:
            - localhost:3000/laboratorios/criar
                {
                    "nome": "Laboratorio 9",
                    "endereco": "rua do laboratorio 9",
                    "status": "ativo"
                }
        - PATCH:
            - localhost:3000/laboratorios/editar
                {
                    "idLaboratorio": 2,
                    "nome": "Laboratório 999",
                   "endereco": "Rua teste",
                    "status": "0"
                }
        - DELETE:
            - localhost:3000/laboratorios/excluir
                {
                    "idLaboratorio": 3
                }

    - Exame:
        - GET:
            - localhost:3000/exames/buscar
            - localhost:3000/exames/buscarPorId/{Id}
            - localhost:3000/exames/buscarPorNome/{Nome}
            - localhost:3000/exames/buscarPorTipo/{Tipo}
            - localhost:3000/exames/buscarPorStatus/{Status} (0 ou 1 ou inativo ou ativo)
            - localhost:3000/exames/buscarExamesLaboratoriosPorNome/{Nome}
        - POST:
            - localhost:3000/exames/criar
                {
                    "nome": "teste insercao 12",
                    "tipo": "imagem",
                    "status": 0,
                    "idLaboratorio": [5, 7]
                }
        - PATCH:
            - localhost:3000/exames/editar
                {
                    "idExame": 12,
                    "nome": "exame 12",
                    "tipo": "analise clinica",
                    "status": "1",
                    "idLaboratorio": 2
                }
        - DELETE:
            - localhost:3000/exames/excluir
                {
                    "idExame": 12
                }