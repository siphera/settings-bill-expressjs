let assert = require("assert");
let SettingsBill = require("../settings-bill");

describe('Settings widget using ExpressJS', function () {
    it('should calculate total cost of phone calls made', function () {
        let Set = SettingsBill();

        Set.callPrice(2);
        Set.bill_Type('call');

        Set.bill_Type('call');
        Set.bill_Type('call');
        Set.bill_Type('call');

        assert.equal(Set.totalCost(), 8);

    });

    it('should calculate total cost of smses sent', function () {
        let Set = SettingsBill()

        Set.smsPrice(0.75);
        Set.bill_Type('sms');
        Set.bill_Type('sms');

        assert.equal(Set.totalCost(), 1.5);
    });

    it('should calculate total cost of smses sent and calls made', function () {
        let Set = SettingsBill()

        Set.smsPrice(0.75);
        Set.bill_Type('sms');
        Set.bill_Type('sms');
        Set.callPrice(2);
        Set.bill_Type('call');
        Set.bill_Type('call');
        Set.bill_Type('call');
        Set.bill_Type('call');

        assert.equal(Set.totalCost(), 9.5);
    });

    it('should return given amount that is charged for an sms', function () {
        let Set = SettingsBill()

        Set.smsPrice(0.75);
        Set.bill_Type('sms')

        assert.equal(Set.smsTotal(), 0.75);
    });

    it('should return given amount that is charged for a call', function () {
        let Set = SettingsBill()

        Set.callPrice(2.75);
        Set.bill_Type('call')

        assert.equal(Set.callTotal(), 2.75);
    });




    it('should return that warning level is reached', function () {
        let Set = SettingsBill()

        Set.warningL(10);

        assert.equal(Set.getWarningLevel(), 10);
    });


    it('should return that critical level is reached', function () {
        let Set = SettingsBill()
        Set.criticalL(10);
        assert.equal(Set.getCriticalLevel(), 10);
    });


});
