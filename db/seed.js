const db = require('./index');
const { Leads } = require('./model');

const demoData = [
  {
    jobPost: 'https://www.indeed.com/rc/clk?jk=6b8a2fa6eb181d72&fccid=317a3c04ed06f798&vjs=3',
    company: 'Veritone',
    position: 'Full Stack Software Engineer(React, Golang)',
    location: 'Costa Mesa',
    applied: false,
  },
  {
    jobPost: 'https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0B_H3FLVzZpyvfvZuUWdVJVDivJwBzLhH0NoYjfgUKglyIZDc0z07233inmdOdhHTUfaU0Ve7GKxFcpi8U4PWu1P6T45DrOWHJS-fgxU-qx8ynXd-BLSC_BxgV5nmrS0UnEnOdKb8e5YfjNO75HvSbZQiZefvL0FGIfJbZOZs39jczD8pdX1uHkvhdEd2oqwcY0WMQ36AM3wwnoc1y_P156aYbTNNHQAizEKt70l2G6AQX4i_rmzyXH3UiFc0OCInWSdn2Bg85ObIpoTQNieyqLcjZuPUOWFpSWh30kOMPNSCmfv4CMCkEd3-J0ZyH4gabeAdKmAIsDL4WR1XcS1ia14sMp7icjxpLlS-zxog-oDaCNbN0JdvfbdcR50Fcv2_QIVgdGEFb4nNR1fNDpDgLySZP78moJrrC6OFGTxXIdcrdo_NMhLcyiZN9xDnc-bQ95d9KK8nAhNZ26jLb7c_gqE1sSDcY6OdRBfVX4sGYhU5I2VHdacTmC_6j1uZ8PAbaImB0FuKNgAiNro-8TSlup&p=1&fvj=0&vjs=3&tk=1dq07e3nbnsl7800&jsa=6587',
    company: 'Codazen',
    position: 'Senior Full Stack Engineer',
    location: 'Laguna Hills',
    applied: false,
  },
  {
    jobPost: 'https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0Cdgli3tETeeNWu1mta8eKQgdxY6GNBnQAz3eoLzXmV7wgUVvpWTR7WWGUPGDFLEbkq6b8cdFra0TChv832JQtHkmyC85cCOWo8Hhtibv3J8xdNBikYt_W-OWw0l4v5eod93KFwNwKVhXwNk-h_sP3iVTHknB_YLLxBV3RfXrM96d_OggwcRFF2bfCgKeTA3JRSxY7I6j1DOILUlQXvFt2N1duSHzyAAzztwKLRMEOnQhcWBBG6tho7Ud4tG-bVeriF8KfYzfweQ3xT4rGjlMEp9NJgQzwAbJp8x9wySIXAbgV3HLAgnzqQh9pKqPX5bRU97xWrk9oZaPVikQsZASUbcmNYv65RyyNfJwf1UEzNgF960XVSQhtwwKqWRNKGiWx0YLyQ_SAKN96QZTl4rDvjEeKx7Ror8HgWFe2zJtgotAVlXnz109TuqBf7qUQ3bqwDlKOgG8HDzA==&p=3&fvj=1&vjs=3&tk=1dq07e3nbnsl7800&jsa=6587',
    company: 'TruClear Global',
    position: 'Software Engineer',
    location: 'Newport Beach',
    applied: false,
  },
  {
    jobPost: 'https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0DwrLOqqQk4qPI7k5bK7LiwIkt8jBQ9rYF0rKpQExpYRJEVv0462XKivmQhZWeenbgW2byEBVvLKLwq86vJ8s1ga-bkvR5M_JQZeX9pKnZVydzRSolncx9MUrkt9gfdtmZgvhdUiV87Gew-Q4HB_UNMOPVa71fsuVirKrcdI4HZ6cYHvisjBWXCmq_m3SVTWAPgW7cp3STxqC5ErLQoSrA-E7cHfu3YCpyAFNBbophs9KRsCrtJT3FWYS6t9fLXFRapO9ZKMsu2Wwt4m3699X-z2pl3HWZv0KPoEx9kj3AN0nmRXpKGRVG5i99VJF8ZLfh8ncRI_gKMFzQgaWxmF1p2b_fUolZODL-Bq5e-W_9fowZ-IVPw_5Ov0VtNFDNe6iFz3MbiGaaumyi_A4xYm04gMT1FgZcrUYjMh8guW5QStWcYL9Mo4ft7UsntXjY8Yv57MzDhYWyxCf398EVha4AfZSaJ92zA3uajXACj3rnj7A==&p=6&fvj=0&vjs=3&tk=1dq07e3nbnsl7800&jsa=6587',
    company: 'Insperity',
    position: 'Full Stack Developer',
    location: 'Laguna Hills',
    applied: false,
  },
  {
    jobPost: 'https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0AGUL3W6OBwq_v3wwmixp2tE0tSI52iW5VXn6pRo6M2WWlIiIJyAmBqSShUwGYkVJqJ3UEVaswSM1KOPXOnByoKkh9QwW6pwMbaYSJtoVVtGACtvhZhXCZCCuh1clyA63jkWCuYX542CsvIRs-ehENizrkKgc-gMkZKLKsF9Q68QEY239h8UJBNj5pxWYrEKQ03isLpXgbCKn16UWrIIrT62iF_tuFSxmnYsS8Erzx1Y9K4XFWMsynOAE8I4oN695YX6APSsfXpdYevmgLag-gOTkNiYUwz5XNsX2v0Wg0eCJh_VNybjYK6JBjbm8yBX61r4_vT5RWhJMtdzi_ojQDsxCQUE28-VGiD3M1q4ZVULAaajwHKaYskx2WZL7DqRDf3kjEq4xSXT6IEFUiETlo3og4InEB3f6uXWm3Ymq432e6K_Ua3YQDHyXbwB5caiQg=&p=7&fvj=1&vjs=3&tk=1dq07e3nbnsl7800&jsa=6587',
    company: 'Fusion of Ideas',
    position: 'Web Developer',
    location: 'Lake Forest',
    applied: false,
  },
];

Leads.insertMany(demoData);
