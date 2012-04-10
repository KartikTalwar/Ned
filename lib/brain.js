
memory = new Db.Database('neuron.mem');


memory.serialize(function() 
{
    memory.run("CREATE TABLE IF NOT EXISTS Note2Self (id INTEGER PRIMARY KEY, user VARCHAR(30), message TEXT)");
});
