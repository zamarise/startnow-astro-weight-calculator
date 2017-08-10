var {window, loadWindow} = require('../libs/testHelper');
const should = require('should');
const expectedPlanets = require('./expected-planets.js');

var $;

describe('AstroWeight Calculator', () => {
    beforeEach(() => {
        window = loadWindow();
        $ = require('jquery')(window);
    });

    describe('HTML', () => {
        it('should contain an <input> element with an id of userWeight', (done) => {
            should.equal($('#userWeight').length == 1
                ? 'Input element exists'
                : 'Input element does not exist', 'Input element exists');
            done();
        });

        it('should contain a <select> element with an id of planets', (done) => {
            should.equal($('#planets').length == 1
                ? 'Select dropdown exists'
                : 'Select dropdown does not exist', 'Select dropdown exists');
            done();
        });

        it('should contain a <p> element with an id of output', (done) => {
            should.equal($('#output').length == 1
                ? 'Paragraph element exists'
                : 'Paragraph element does not exist', 'Paragraph element exists');
            done();
        });
    });

    describe('JavaScript', () => {
        it('should have a function called calculateWeight', () => {
            should.exist(window.calculateWeight);
        });

        it('should have a function called handleClickEvent', () => {
            should.exist(window.handleClickEvent);
        });

        it('should bind click event to handleClickEvent', () => {
            window.eval(`
      // This code executes in the jsdom global scope
      calculateWeightButton_testElement = document.getElementById('calculateWeight');
    `);
            const element = window.calculateWeightButton_testElement;
            should.exist(element.onclick);
        });

        it('should contain an array of planets', () => {
            expectedPlanets.forEach((p, i) => {
                should.equal(p[0], window.planets[i][0]);
                should.equal(p[1], window.planets[i][1]);
            })
        });

        [
            [
                6, 100, 'Pluto'
            ],
            [
                114.8, 100, 'Neptune'
            ],
            [
                91.7, 100, 'Uranus'
            ],
            [
                113.9, 100, 'Saturn'
            ],
            [
                264, 100, 'Jupiter'
            ],
            [
                38.95, 100, 'Mars'
            ],
            [
                16.55, 100, 'Moon'
            ],
            [
                100, 100, 'Earth'
            ],
            [
                90.32, 100, 'Venus'
            ],
            [
                37.7, 100, 'Mercury'
            ],
            [2790, 100, 'Sun']
        ].forEach(([expected, a1, a2]) => {
            it(`should return ${expected} with ${a1}, ${a2} as arguments`, () => {
                should.equal(window.calculateWeight(a1, a2), expected);
            });
        });
    })

    describe('Integration', () => {
        it('should print valid output', (done) => {
            $("#planets option[value='0.06']").attr('selected', 'selected');
            $("#userWeight").val(100);
            $("#calculateWeight").click();
            should.equal($("#output").text(), 'If you were on Pluto, you would weigh 6 pounds!');
            done();
        });
    });
});
