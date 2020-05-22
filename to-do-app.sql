SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema to-do-app
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `to-do-app`;

-- -----------------------------------------------------
-- Schema to-do-app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `to-do-app` DEFAULT CHARACTER SET utf8 ;
USE `to-do-app` ;

-- -----------------------------------------------------
-- Table `to-do-app`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `to-do-app`.`users` ;

CREATE TABLE IF NOT EXISTS `to-do-app`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `dataReg` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `to-do-app`.`lists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `to-do-app`.`lists` ;

CREATE TABLE IF NOT EXISTS `to-do-app`.`lists` (
  `id_list` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_list`),
  INDEX `fk_lists_users_idx` (`id_user` ASC),
  CONSTRAINT `fk_lists_users`
    FOREIGN KEY (`id_user`)
    REFERENCES `to-do-app`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `to-do-app`.`items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `to-do-app`.`items` ;

CREATE TABLE IF NOT EXISTS `to-do-app`.`items` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `done` TINYINT NOT NULL DEFAULT 0,
  `id_list` INT NOT NULL,
  PRIMARY KEY (`id_item`),
  INDEX `fk_items_lists1_idx` (`id_list` ASC),
  CONSTRAINT `fk_items_lists1`
    FOREIGN KEY (`id_list`)
    REFERENCES `to-do-app`.`lists` (`id_list`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `to-do-app`.`users` (`username`, `name`, `email`, `password`, `dataReg`, `type`) VALUES ('username1', 'username1', 'aaaaa@aaaa.pt', 'username1', '2017-11-17 20:51:32', 'NULL');
INSERT INTO `to-do-app`.`users` (`username`, `name`, `email`, `password`, `dataReg`, `type`) VALUES ('username2', 'username2', 'username2@mail.pt', 'username2', '2017-11-22 19:49:16', 'admin');

INSERT INTO `to-do-app`.`lists` (`name`, `id_user`) VALUES ('Home', '1');
INSERT INTO `to-do-app`.`lists` (`name`, `id_user`) VALUES ('Work', '1');
INSERT INTO `to-do-app`.`lists` (`name`, `id_user`) VALUES ('Work', '2');
INSERT INTO `to-do-app`.`lists` (`name`, `id_user`) VALUES ('Gym', '2');

INSERT INTO `to-do-app`.`items` (`name`, `done`, `id_list`) VALUES ('Clean', '1');
INSERT INTO `to-do-app`.`items` (`name`, `done`, `id_list`) VALUES ('App', '3');