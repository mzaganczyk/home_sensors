from flask import Flask, request, Response, render_template, jsonify
import pandas as pd
import datetime as dt

app = Flask(__name__)

data = pd.DataFrame(columns=["Temperature", "Pressure"])


@app.route("/", methods=["POST", "GET"])
def result():
    global data
    if request.method == "GET":
        return render_template("index.html")
    elif request.method == "POST":
        time = pd.to_datetime("today").strftime("%Y-%m-%d %H:%M:%S")
        temp = request.values.get("temperature")
        press = request.values.get("pressure")
        data.loc[time, "Temperature"] = temp
        data.loc[time, "Pressure"] = press
        data = data.iloc[-100:]
        return Response("200 OK", status=200)


@app.route("/data", methods=["GET"])
def get_data():
    return jsonify(
        {
            "labels": list(data.index),
            "temp": list(data.Temperature),
            "press": list(data.Pressure),
        }
    )


@app.route("/last_tick", methods=["GET"])
def show_last_tick():
    try:
        return jsonify(
            {
                "labels": data.index[-1],
                "temp": data.Temperature[-1],
                "press": data.Pressure[-1],
            }
        )
    except IndexError:
        return Response("Last tick not available", status=500)


if __name__ == "__main__":
    app.run()
