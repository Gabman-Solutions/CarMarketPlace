def connect(self):
        self.connection = sqlite3.connect(self.database)
        


def getCar(self, car_id):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM cars WHERE id = ?", (car_id,))
        car = cursor.fetchone()
        return car
    