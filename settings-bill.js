module.exports = function SettingBill() {
    let criticalLevel;
    let warningLevel;
    let callCost;
    let smsCost;

    let sms = 0.0;
    let call = 0.0;
    let Total = 0.0;

    let actionList = [];
    let color = '';
    let billType = '';
    let costPrice = 0;

    function callPrice(call_cost) {
        callCost = parseFloat(call_cost);
    }


    function getCall() {
        return callCost
    }

    function smsPrice(sms_cost) {
        smsCost = parseFloat(sms_cost);
    }

    function getSms() {
        return smsCost;
    }

    function criticalL(critical_level) {
        criticalLevel = parseFloat(critical_level);

    }

    function getCriticalLevel() {
        return criticalLevel
    }

    function warningL(warning_level) {
        warningLevel = parseFloat(warning_level);
    }

    function getWarningLevel() {
        return warningLevel
    }


    function bill_Type(costType) {

        let billTypeEntered = costType;
        let costPrice = 0;

        if (Total >= criticalLevel) {
            return;
        } else {

            if (billTypeEntered === "call") {
                call += callCost;
                costPrice = callCost;
            } else if (billTypeEntered === "sms") {
                sms += smsCost;
                costPrice = smsCost;
            }

        }

        actionList.push({
            type: billTypeEntered,
            cost: costPrice,
            timestamp: new Date()
        });

        return costType;
    }


    function actions() {
        return actionList;
    }

    function actionsFor(billType) {
        return actionList.filter((bill) => bill.type === billType);
    }

    function callTotal() {
        return call.toFixed(2);
    }

    function smsTotal() {
        return sms.toFixed(2);
    }

    function totalCost() {
        Total = call + sms;
        return Total.toFixed(2);
    }

    function colorChange() {

        if (Total > criticalLevel) {
            let color = 'danger'
            return color;
        }
        if (Total > warningLevel) {
            let color = 'warning'
            return color;
        }
    }

    function resetBtn() {

        sms = 0;
        call = 0;
        Total = 0;
        criticalLevel = 0;
        warningLevel = 0;
        callCost = 0;
        smsCost = 0;

        actionList = [];
        billType = '';
        costPrice = 0;

    }

    return {
        bill_Type,
        callTotal,
        smsTotal,
        totalCost,
        smsPrice,
        callPrice,
        warningL,
        criticalL,
        getCall,
        getSms,
        getCriticalLevel,
        getWarningLevel,
        colorChange,
        actions,
        actionsFor,
        resetBtn
    }


}
