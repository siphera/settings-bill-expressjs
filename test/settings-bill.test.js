let assert = require("assert");
let SettingsBill = require("../settings-bill");

describe('Settings widget using ExpressJS', function () {
    it('should calculate total cost of phone calls made', function () {
        let setting = SettingsBill();

        setting.callPrice(2);
        setting.bill_Type('call');

        setting.bill_Type('call');
        setting.bill_Type('call');
        setting.bill_Type('call');

        assert.equal(setting.totalCost(), 8);

    });

    it('should calculate total cost of smses sent', function () {
        let setting = SettingsBill()

        setting.smsPrice(0.75);
        setting.bill_Type('sms');
        setting.bill_Type('sms');

        assert.equal(setting.totalCost(), 1.5);
    });

    it('should calculate total cost of smses sent and calls made', function () {
        let setting = SettingsBill()

        setting.smsPrice(0.75);
        setting.bill_Type('sms');
        setting.bill_Type('sms');
        setting.callPrice(2);
        setting.bill_Type('call');
        setting.bill_Type('call');
        setting.bill_Type('call');
        setting.bill_Type('call');

        assert.equal(setting.totalCost(), 9.5);
    });

    it('should return given amount that is charged for an sms', function () {
        let setting = SettingsBill()

        setting.smsPrice(0.75);
        setting.bill_Type('sms')

        assert.equal(setting.smsTotal(), 0.75);
    });

    it('should return given amount that is charged for a call', function () {
        let setting = SettingsBill()

        setting.callPrice(2.75);
        setting.bill_Type('call')

        assert.equal(setting.callTotal(), 2.75);
    });




    it('should return that warning level is reached', function () {
        let setting = SettingsBill()

        setting.warningL(10);

        assert.equal(setting.getWarningLevel(), 10);
    });


    it('should return that critical level is reached', function () {
        let setting = SettingsBill()
        setting.criticalL(10);
        assert.equal(setting.getCriticalLevel(), 10);
    });


});
