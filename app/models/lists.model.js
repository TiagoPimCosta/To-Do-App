module.exports = {
    create(data, callback) {
        var sql = "INSERT INTO lists (name, id_user) VALUES (?, ?)"; 
		global.connection.query(
			sql, [data.name, data.id_user], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
    },
    
	read(id_user, callback) {
        var sql = "SELECT * FROM lists  where id_user = ?";	
		global.connection.query(sql, [id_user], function(error, rows, fields) {
			if (error) throw error;
			callback(rows);			
		});
	},	

	update(data, callback) {
        var sql = "UPDATE lists SET name = ? WHERE id_list = ? AND id_user = ?";
		global.connection.query(
			sql, [data.name, data.id_list, data.id_user], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	delete(data, callback) {
        var sql = "DELETE FROM lists WHERE id_list = ? AND id_user = ?";
		global.connection.query(sql, [data.id_list, data.id_user], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
