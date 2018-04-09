from flask import Flask,render_template
from domains import blue_print as domains_bp



app = Flask(__name__)


app.register_blueprint(domains_bp,url_prefix='/domains')

@app.route('/')
def index():
    return render_template('index.html')


# @app.route('/domians')
# def 

if  __name__=="__main__":
    # app.run(host='0.0.0.0',port=8888,debug=True)    
    app.run(debug=True)