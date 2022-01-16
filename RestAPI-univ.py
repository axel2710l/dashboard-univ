# print('Salamolikom')
import json
from flask import Flask, render_template , redirect , request,make_response, jsonify
from flaskext.mysql import MySQL


app = Flask(__name__)
mysql = MySQL()


app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'db_university'

mysql.init_app(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/students/perYear', methods=['GET'])
def stdPerYear():
    conn=mysql.connect()
    #create cursor
    cursor= conn.cursor()

    cursor.execute('SELECT annee, count(*) AS nbrstd FROM resultats GROUP BY annee')
    data=cursor.fetchall()
    row_headers=[x[0] for x in cursor.description]
    cursor.close()

    json_data=[]
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return make_response(jsonify(json_data),200)

@app.route('/api/students/perSpeciality/<string:spec>', methods=['GET'])
def stdPerSpec(spec):
    print(spec)
    conn=mysql.connect()
    #create cursor
    cursor= conn.cursor()
    sql = "SELECT annee,  count(*) AS nbrstd FROM resultats WHERE specialite='specialite_1' GROUP BY annee;"
    # val = (spec)
    print(sql)
    cursor.execute(sql)
    data=cursor.fetchall()
    row_headers=[x[0] for x in cursor.description]
    cursor.close()

    json_data=[]
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return make_response(jsonify(json_data),200)



if __name__ == "__main__":
    app.run(debug=True)