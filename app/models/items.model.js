module.exports = {
    create(data, callback) {
        var sql = "INSERT INTO items (name, id_list) VALUES (?, ?)";
		global.connection.query(
			sql, [data.name, data.id_list], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
    },
    
	read(id_list, callback) {
        var sql = "SELECT * FROM items  where id_list = ?";	
		global.connection.query(sql, [id_list], function(error, rows, fields) {
			if (error) throw error;
			callback(rows);			
		});
	},	

	updateName(data, callback) {
        var sql = "UPDATE items SET name = ? WHERE id_item = ?";
		global.connection.query(
			sql, [data.name, data.id_item], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
    },
    
    updateDone(data, callback) {  // Not finished
        var sql = "UPDATE items SET done = ? WHERE id_item = ?";
		global.connection.query(
			sql, [data.done, data.id_item], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	delete(id_item, callback) {
        var sql = "DELETE FROM items WHERE id_item = ?;"
		global.connection.query(sql, [id_item], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
