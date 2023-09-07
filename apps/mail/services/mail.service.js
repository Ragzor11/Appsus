// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()
query()
export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}
function query(filterBy = {}){
    console.log('query filter by',filterBy)
    return storageService.query(MAIL_KEY).then(mails =>{
        if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.senderMail) || regExp.test(mail.senderName))}
            return mails
})

}
function get(mailId) {
    return storageService.get(KEY,mailId)
}

function remove(mailId) {
    return storageService.remove(KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(KEY, mail)
    } else {
        return storageService.post(KEY, mail)
    }
}
function getDefaultFilter(){
    return { txt: ''}

}

function _createMail(subject, body, senderName,senderMail){
    const mail={
    id: utilService.makeId() ,
    subject,
    body,
    isRead: false,
    sentAt: new Date(),
    removedAt: null,
    senderName,
    senderMail,
    to: loggedInUser.email

    }
    return mail
}
function _createMails(){
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length){
        mails = []
        mails.push(_createMail('start','deadadeaedaaadaedaedaedaed','Reddit','test@test.com'))
        mails.push(_createMail('middle','12312312312312312312','X(formerly Twitter)','test@test.com'))
        mails.push(_createMail('end','1o2u3n1ou23n1o2u3n1o2u3n1ou','Myprotein','test@test.com'))
        storageService.saveToStorage(MAIL_KEY,mails)
        
    }
}