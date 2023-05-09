/**
 * @copyright 2023 © DigiNet
 * @author  ngochuy
 * @create 2023-04-03
 * @update 2023-04-03
 * @command $ npm run unit-test mail.hook
 * @command $ jest --colors --forceExit mail.hook -t "sails.hooks.mail.send expect send success"
 */

describe('sails.hooks.mail', () => {
    let req;
    beforeAll(() => {
        let { post } = require('request');
        post.file = () => {
            return {
                upload: ({ }, cb) => {
                    return cb(null, [])
                }
            }
        }
        req = post;

        sails.hooks.mail.send = jest.fn(() => Promise.resolve({
            "urls": [],
            "accepted": [
                "taoradestestjjkj8@gmail.com"
            ],
            "rejected": [],
            "envelopeTime": 654,
            "messageTime": 652,
            "messageSize": 4073,
            "response": "250 2.0.0 OK  1663131297 a2-20020a170902710200b00172f4835f60sm9389779pll.189 - gsmtp",
            "envelope": {
                "from": "onemailler@diginet.com.vn",
                "to": [
                    "taoradestestjjkj8@gmail.com"
                ]
            },
            "messageId": "<e19e7db7-2414-7f94-c008-237e8ec2a38b@diginet.com.vn>"
        }));
    });
    describe('send', () => {
        test('sails.hooks.mail.send expect send success', async () => {

            const options = {
                "to": [
                    "ethan.huypham@gmail.com"
                ],
                "cc": [
                    "vohoangnguyen07@gmail.com"
                ],
                "bcc": [],
                "subject": "Thư cảm ơn",
                "signature": "",
                "priority": "normal",
                "moduleId": "W25",
                "transactionId": "W25PYSTCBPP6BCHAIGPY",
                "key01": "CandidateID001",
                "key02": "",
                "key03": "",
                "content": `Dear <%- CandidateName %>,
                    Thank you for applying to <%- CompanyName %>`,
                "params": [
                    {
                        "key": "CandidateName",
                        "type": "VARCHAR",
                        "value": "Ryan"
                    },
                    {
                        "key": "CompanyName",
                        "type": "VARCHAR",
                        "value": "DigiNet INC"
                    }
                ],
                "attachmentsURL": [
                    {
                        "filename": "DOCUMENT_API_DIGINET_SBJ_V1.1.pdf",
                        "path": "file/91AI0Y700001825.pdf?path=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InBhdGgiOiIvTEVNT04zX0VSUC8yMDIxLTctNl9iNWIxYWFmZjA4NWIwNzYxMzI1MGU5ZDNhNDJhNWFkNV8xNjI1NTY1NDMwNDM3LnBkZiIsIm9yaWdpbmFsRmlsZU5hbWUiOiI5MUFJMFk3MDAwMDE4MjUucGRmIiwicHVybCI6Imh0dHBzOi8vYXByaWNvdC5kaWdpbmV0LmNvbS52bi9jZG4tZGV2IiwiaXVybCI6Imh0dHA6Ly8xMC4wLjAuOTk6NjA0MC92MSJ9XSwiaWF0IjoxNjI1NTY1NDMwLCJleHAiOjg4MDI1NTY1NDMwfQ.SqnY9SYYUHS2ApB2218P5kI-zRCTHzeHpYqSmee_skc"
                    }
                ],
                "HostID": "LEMON_EOYJ_8199_POJE",
                'UserID': "LEMONADMIN",
                "createUserId": "LEMONADMIN"
            };

            const result = await sails.hooks.mail.send(req, options);

            expect(result).toEqual(expect.objectContaining({
                urls: expect.toBeArray(),
                accepted: expect.toBeArray(),
                rejected: expect.toBeArray(),
                response: expect.toBeString(),
                messageId: expect.toBeString(),
            }));
        }, 30000);
        test('sails.hooks.mail.send expect MailValidationError', async () => {

            const options = {
                "subject": "Thư cảm ơn",
                "signature": "",
                "priority": "normal",
                "moduleId": "W25",
                "transactionId": "W25PYSTCBPP6BCHAIGPY",
                "key01": "CandidateID001",
                "key02": "",
                "key03": "",
                "content": `Dear <%- CandidateName %>,
                    Thank you for applying to <%- CompanyName %>`,
                "params": [
                    {
                        "key": "CandidateName",
                        "type": "VARCHAR",
                        "value": "Ryan"
                    },
                    {
                        "key": "CompanyName",
                        "type": "VARCHAR",
                        "value": "DigiNet INC"
                    }
                ],
                "attachmentsURL": [
                    {
                        "filename": "DOCUMENT_API_DIGINET_SBJ_V1.1.pdf",
                        "path": "file/91AI0Y700001825.pdf?path=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InBhdGgiOiIvTEVNT04zX0VSUC8yMDIxLTctNl9iNWIxYWFmZjA4NWIwNzYxMzI1MGU5ZDNhNDJhNWFkNV8xNjI1NTY1NDMwNDM3LnBkZiIsIm9yaWdpbmFsRmlsZU5hbWUiOiI5MUFJMFk3MDAwMDE4MjUucGRmIiwicHVybCI6Imh0dHBzOi8vYXByaWNvdC5kaWdpbmV0LmNvbS52bi9jZG4tZGV2IiwiaXVybCI6Imh0dHA6Ly8xMC4wLjAuOTk6NjA0MC92MSJ9XSwiaWF0IjoxNjI1NTY1NDMwLCJleHAiOjg4MDI1NTY1NDMwfQ.SqnY9SYYUHS2ApB2218P5kI-zRCTHzeHpYqSmee_skc"
                    }
                ],
                "HostID": "LEMON_EOYJ_8199_POJE",
                'UserID': "LEMONADMIN",
                "createUserId": "LEMONADMIN"
            };

            try {
                await sails.hooks.mail.send(req, options);
                expect(1).toBeTruthy();
            } catch (error) {
                expect(error).toEqual(expect.objectContaining({
                    code: 'MailValidationError',
                    message: expect.toBeString(),
                }));
            }
        });
        test('sails.hooks.mail.send expect MailRenderError', async () => {

            const options = {
                "to": [
                    "ethan.huypham@gmail.com"
                ],
                "cc": [
                    "vohoangnguyen07@gmail.com"
                ],
                "bcc": [],
                "subject": "Thư cảm ơn",
                "signature": "",
                "priority": "normal",
                "moduleId": "W25",
                "transactionId": "W25PYSTCBPP6BCHAIGPY",
                "key01": "CandidateID001",
                "key02": "",
                "key03": "",
                "content": `Dear <%- CandidateName %>,
                    Thank you for applying to <%- CompanyName %>`,
                "params": [],
                "attachmentsURL": [
                    {
                        "filename": "DOCUMENT_API_DIGINET_SBJ_V1.1.pdf",
                        "path": "file/91AI0Y700001825.pdf?path=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InBhdGgiOiIvTEVNT04zX0VSUC8yMDIxLTctNl9iNWIxYWFmZjA4NWIwNzYxMzI1MGU5ZDNhNDJhNWFkNV8xNjI1NTY1NDMwNDM3LnBkZiIsIm9yaWdpbmFsRmlsZU5hbWUiOiI5MUFJMFk3MDAwMDE4MjUucGRmIiwicHVybCI6Imh0dHBzOi8vYXByaWNvdC5kaWdpbmV0LmNvbS52bi9jZG4tZGV2IiwiaXVybCI6Imh0dHA6Ly8xMC4wLjAuOTk6NjA0MC92MSJ9XSwiaWF0IjoxNjI1NTY1NDMwLCJleHAiOjg4MDI1NTY1NDMwfQ.SqnY9SYYUHS2ApB2218P5kI-zRCTHzeHpYqSmee_skc"
                    }
                ],
                "HostID": "LEMON_EOYJ_8199_POJE",
                'UserID': "LEMONADMIN",
                "createUserId": "LEMONADMIN"
            };

            try {
                await sails.hooks.mail.send(req, options);
                expect(1).toBeTruthy();
            } catch (error) {
                expect(error).toEqual(expect.objectContaining({
                    code: 'MailRenderError',
                    message: expect.toBeString(),
                }));
            }
        });
    });
    describe('notificationMail', () => {
        test('MailService.notificationMail expect send success', async () => {

            const { notificationMail } = require('../../../api/services/MailService');

            const data = [
                {
                    TemplateMailID: "",
                    ContentMail: `Dear <%- CandidateName %>,
                                Thank you for applying to <%- CompanyName %>`,
                    TitleMail: "Invitation to interview",
                    RecieveEmail: "taoradetest7@gmail.com,vata.joe91@yahoo.com",
                    IsAddLink: 1,
                    W84P3030_FormID: "W51F2202",
                    VoucherID: "Y5IPXSS2SHRIBMPC6ASN",
                    appid: "WHRP",
                    Link_FormID: "W51F2202",
                    Link_FormParentID: "",
                    Link_VoucherID: "Y5IPXSS2SHRIBMPC6ASN",
                    Link_Type: 1,
                    Link_KeyID01: "ID01",
                    URLAttachment: "file/91AI0Y700001821.jfif?path=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InBhdGgiOiIvTEVNT04zX0VSUC8yMDIxLTctNl80YzVkZmQ3ZWUxNmMyNTg5NmNhNDM1ZmVmOThhNjUwNV8xNjI1NTQxMzc4OTUyLmpmaWYiLCJvcmlnaW5hbEZpbGVOYW1lIjoiOTFBSTBZNzAwMDAxODIxLmpmaWYiLCJwdXJsIjoiaHR0cHM6Ly9hcHJpY290LmRpZ2luZXQuY29tLnZuL2Nkbi1kZXYiLCJpdXJsIjoiaHR0cDovLzEwLjAuMC45OTo2MDQwL3YxIn1dLCJpYXQiOjE2MjU1NDEzNzgsImV4cCI6ODgwMjU1NDEzNzh9.LXkOAy0PieKTCeaAzZT2_1UfVon7xTpbzIcsz8_xlUM"
                },
            ];

            // ('W84P3030', [
            //     { key: 'DivisionID', type: 'VARCHAR', value: options.DivisionID, default: '' },
            //     { key: 'FormID', type: 'VARCHAR', value: iterator.W84P3030_FormID, default: '' },
            //     { key: 'UserID', type: 'VARCHAR', value: options.UserID, default: '' },
            //     { key: 'Language', type: 'VARCHAR', value: options.Language, default: '84' },
            //     { key: 'VoucherID', type: 'VARCHAR', value: iterator.VoucherID, default: '' },
            //     { key: 'Type', type: 'INT', value: iterator.Type, default: 0 },
            //     { key: 'Mode', type: 'INT', value: 1 }, // 1: gui mail
            //     { key: 'TransType', type: 'VARCHAR', value: options.TransType, default: '' },
            // ], 'recordset[0]');
            let StoreProcedureService = require('../../../api/services/StoreProcedureService');
            StoreProcedureService.generateStored = jest.fn().mockResolvedValue({
                CandidateName: 'Ryan',
                CompanyName: 'DigiNet INC',
            });

            try {
                await notificationMail(req, { UserID: 'LEMONADMIN' }, data);
                expect(1).toBeTruthy();
            } catch (error) {
                console.error(error)
            }
        });
        test('sails.hooks.mail.notificationMail expect send success', async () => {

            const data = [
                {
                    TemplateMailID: "",
                    ContentMail: `Dear Ryan,
                    Thank you for applying to DigiNet INC`,
                    TitleMail: "Invitation to interview",
                    RecieveEmail: "taoradetest9@gmail.com",
                    IsAddLink: 1,
                    W84P3030_FormID: "W51F2202",
                    VoucherID: "Y5IPXSS2SHRIBMPC6ASN",
                    appid: "WHRP",
                    Link_FormID: "W51F2201",
                    Link_FormParentID: "",
                    Link_VoucherID: "Y5IPXSS2SHRIBMPC6ASN",
                    Link_Type: 1,
                    Link_KeyID01: "ID01",
                    URLAttachment: null,
                },
            ];

            try {
                await sails.hooks.mail.notificationMail(req, { UserID: 'LEMONADMIN' }, data);
                expect(1).toBeTruthy();
            } catch (error) {
                console.error(error)
            }
        });
    });
});
