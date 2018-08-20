const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const SettingsBill = require('./settings-bill');
const Set = SettingsBill();

const moment = require('moment');

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        "timestamp": function () {
            return moment(this.timestamp).fromNow();
        }
    }
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {

    const call = Set.getCall();
    const sms = Set.getSms();
    const warning = Set.getWarningLevel();
    const critical = Set.getCriticalLevel();

    const callTotal = Set.callTotal(call)
    console.log(callTotal);
    const smsTotal = Set.smsTotal(sms);
    const grandTotal = Set.totalCost();

    let color = Set.colorChange();

    res.render('home', {
        call,
        sms,
        critical,
        warning,
        callTotal,
        smsTotal,
        grandTotal,
        color
    });

});

app.post('/settings', function (req, res) {
    const smsCost = req.body.smsCost;
    const callCost = req.body.callCost;
    const warningLevel = req.body.warningLevel;
    const criticalLevel = req.body.criticalLevel;

    Set.callPrice(callCost);
    Set.smsPrice(smsCost);
    Set.warningL(warningLevel);
    Set.criticalL(criticalLevel);

    res.redirect('/');
});

app.post('/action', function (req, res) {
    Set.bill_Type(req.body.costType);
    res.redirect('/');
});


app.get('/actions', function (req, res) {
    res.render('actions', {
        actions: Set.actions()
    });
});
app.post('/resetBtn', function (req, res) {
    Set.resetBtn();
    res.redirect('/');
});

app.get('/actions/:billType', function (req, res) {
    let billAction = req.params.billType;
    res.render('actions', {
        actions: Set.actionsFor(billAction)
    })
});

let PORT = process.env.PORT || 3009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});