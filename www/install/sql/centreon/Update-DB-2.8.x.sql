-- Create remote servers table for keeping track of remote instances
CREATE TABLE IF NOT EXISTS `remote_servers` (
`id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`ip` VARCHAR(16) NOT NULL,
`app_key` VARCHAR(40) NOT NULL,
`version` VARCHAR(16) NOT NULL,
`is_connected` TINYINT(1) NOT NULL DEFAULT 0,
`created_at` TIMESTAMP NOT NULL,
`connected_at` TIMESTAMP NULL
`app_key` VARCHAR(40) NOT NULL,
`version` VARCHAR(16) NOT NULL,
`is_connected` TINYINT(1) NOT NULL DEFAULT 0,
`created_at` TIMESTAMP NOT NULL,
`connected_at` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Add column to topology table to mark which pages are with React
ALTER TABLE `topology` ADD COLUMN `is_react` ENUM('0', '1') NOT NULL DEFAULT '0' AFTER `readonly`;