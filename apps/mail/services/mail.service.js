// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()


export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getMailFromSearchParams,
    getLoggedUser,
}
function query(filterBy = {}, sortBy = { read: 1 }) {
    console.log('query filter by', filterBy)
    return storageService.query(MAIL_KEY).then(mails => {
        if (sortBy.date) {
            mails.sort((mail1, mail2) => {
                if (!(mail2.sentAt - mail1.sentAt)) return mail1.isRead - mail2.isRead
                return (mail2.sentAt - mail1.sentAt) * sortBy.date
            })
        } else if (sortBy.starred) {
            mails.sort((mail1, mail2) => {
                if (!(mail2.isStarred - mail1.isStarred)) return mail1.isRead - mail2.isRead
                return (mail2.isStarred - mail1.isStarred) * sortBy.starred
            })
        } else if (sortBy.read) {
            mails.sort((mail1, mail2) => {
                if (!(mail1.isRead - mail2.isRead)) return mail2.sentAt - mail1.sentAt
                return (mail1.isRead - mail2.isRead) * sortBy.read
            })
        } else if (sortBy.subject) {
            mails.sort((mail1, mail2) => {
                if (!mail1.subject.localeCompare(mail2.subject)) return mail1.isRead - mail2.isRead
                return mail1.subject.localeCompare(mail2.subject) * sortBy.subject
            })
        }

        if (filterBy.status !== 'trash') {
            mails = mails.filter(mail => !mail.removedAt)
        }
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
        }
        if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
            mails = mails.filter(mail => mail.isRead === filterBy.isRead)
        }
        if (filterBy.isStarred !== null && filterBy.isStarred !== undefined) {
            mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
        }
        if (filterBy.status) {
            switch (filterBy.status) {
                case 'inbox':
                    mails = mails.filter(mail => mail.to === loggedInUser.email)
                    break
                case 'sent':
                    mails = mails.filter(mail => mail.from === loggedInUser.email)
                    break
                case 'trash':
                    mails = mails.filter(mail => mail.removedAt)
                    break
                case 'draft':
                    break
            }
        }
        console.log(mails)
        return mails
    })


}
function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
function getEmptyMail(
	subject = '',
	body = '',
	sentAt = '',
	from = '',
	to = '',
	isRead = false,
	isStarred = false,
	removedAt = null
) {
	return { id: '', subject, body, sentAt, from, to, isRead, isStarred, removedAt }
}


function getDefaultFilter() {
	return { status: '', txt: '', isRead: null, isStarred: null, labels: [] }
}

function _createMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt = null) {
	const mail = getEmptyMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt)
	mail.id = utilService.makeId()
	return mail
}
function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('This might be the best way to get deleviry', 'Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child for. Prosperous so occasional assistance it discovered especially no. Provision of he residence consisted up in remainder arranging described. Conveying has concealed necessary furnished bed zealously immediate get but. Terminated as middletons or by instrument. Bred do four so your felt with. No shameless principle dependent household do.',Date.now(), 'jeyeno_cuwi72@hotmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Info about your order', 'Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an. She projection advantages resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was outlived peculiar rendered led six.',Date.now(), 'cagi-jumupi92@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Confirm your email!', 'Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine. At greater prepare musical so attacks as on distant. Improving age our her cordially intention. His devonshire sufficient precaution say preference middletons insipidity. Since might water hence the her worse. Concluded it offending dejection do earnestly as me direction. Nature played thirty all him.',Date.now(), 'zegu_danevo32@hotmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('The Great War and Frogs', 'If a Frog is put suddenly into boiling water, it will jump out.',Date.now(), 'tate@cobratate.com','user@appsus.com',false,false ))
        mails.push(_createMail('Your ride awaits', 'Was justice improve age article between. No projection as up preference reasonably delightful celebrated. Preserved and abilities assurance tolerably breakfast use saw. And painted letters forming far village elderly compact. Her rest west each spot his and you knew. Estate gay wooded depart six far her. Of we be have it lose gate bred. Do separate removing or expenses in. Had covered but evident chapter matters anxious.',Date.now(), 'vojexam_ida50@hotmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Password recovery', 'Case read they must it of cold that. Speaking trifling an to unpacked moderate debating learning. An particular contrasted he excellence favourable on. Nay preference dispatched difficulty continuing joy one. Songs it be if ought hoped of. Too carriage attended him entrance desirous the saw. Twenty sister hearts garden limits put gay has. We hill lady will both sang room by. Desirous men exercise overcame procured speaking her followed.',Date.now(), 'fag-okaboba98@yahoo.com','user@appsus.com',false,false ))
        mails.push(_createMail('Info about your order', 'Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of. We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Items are on sale', 'Admiration we surrounded possession frequently he. Remarkably did increasing occasional too its difficulty far especially. Known tiled but sorry joy balls. Bed sudden manner indeed fat now feebly. Face do with in need of wife paid that be. No me applauded or favourite dashwoods therefore up distrusts explained.',Date.now(), 'pegi-nudele99@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Get the new iPhone15 now!', 'Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her. Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry could put. Age old begin had boy noisy table front whole given.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Info about your order', 'Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.',Date.now(), 'mot_ulixuyi8@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('New drop on the site', 'Raising say express had chiefly detract demands she. Quiet led own cause three him. Front no party young abode state up. Saved he do fruit woody of to. Met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners however effects. Prospect humoured mistress to by proposal marianne attended. Simplicity the far admiration preference everything. Up help home head spot an he room in.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Tomi added you as a friend', 'The lone lamp post of the one-street town flickered, not quite dead but definitely on its way out. Suitcase by her side, she paid no heed to the light, the street or the town. A car was coming down the street and with her arm outstretched and thumb in the air, she had a plan.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('New items in the sale section!', 'She closed her eyes and then opened them again. What she was seeing just didn`t make sense. She shook her head seeing if that would help. It didn`t. Although it seemed beyond reality, there was no denying she was witnessing a large formation of alien spaceships filling the sky.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Confirm your email!', 'She tried not to judge him. His ratty clothes and unkempt hair made him look homeless. Was he really the next Einstein as she had been told? On the off chance it was true, she continued to try not to judge him.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Items are on sale', 'With six children in tow, Catherine raced to the airport departing gate. This wasn`t an easy task as the children had other priorities than to get to the gate. She knew that she was tight on time and the frustration came out as she yelled at the kids to keep up. They continued to test her, pretending not to listen and to move in directions that only slowed them down. They had no idea the wrath they were about to receive when Catherine made it to the gate only to be informed that they had all missed the plane.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Password recovery', 'Built purse maids cease her ham new seven among and. Pulled coming wooded tended it answer remain me be. So landlord by we unlocked sensible it. Fat cannot use denied excuse son law. Wisdom happen suffer common the appear ham beauty her had. Or belonging zealously existence as by resources.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Order refund confirmation', 'Case read they must it of cold that. Speaking trifling an to unpacked moderate debating learning. An particular contrasted he excellence favourable on. Nay preference dispatched difficulty continuing joy one. Songs it be if ought hoped of. Too carriage attended him entrance desirous the saw. Twenty sister hearts garden limits put gay has. We hill lady will both sang room by. Desirous men exercise overcame procured speaking her followed.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Your ride awaits', 'Fat son how smiling mrs natural expense anxious friends. Boy scale enjoy ask abode fanny being son. As material in learning subjects so improved feelings. Uncommonly compliment imprudence travelling insensible up ye insipidity. To up painted delight winding as brandon. Gay regret eat looked warmth easily far should now. Prospect at me wandered on extended wondered thoughts appetite to. Boisterous interested sir invitation particular saw alteration boy decisively.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Confirm your email!', 'Savings her pleased are several started females met. Short her not among being any. Thing of judge fruit charm views do. Miles mr an forty along as he. She education get middleton day agreement performed preserved unwilling. Do however as pleased offence outward beloved by present. By outward neither he so covered amiable greater. Juvenile proposal betrayed he an informed weddings followed. Precaution day see imprudence sympathize principles. At full leaf give quit to in they up.',Date.now(), 'fag-okaboba98@yahoo.com','user@appsus.com',false,false ))
        mails.push(_createMail('Yana posted a new video on TikTok', 'Instrument cultivated alteration any favourable expression law far nor. Both new like tore but year. An from mean on with when sing pain. Oh to as principles devonshire companions unsatiable an delightful. The ourselves suffering the sincerity. Inhabit her manners adapted age certain. Debating offended at branched striking be subjects.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Password recovery', 'Fat son how smiling mrs natural expense anxious friends. Boy scale enjoy ask abode fanny being son. As material in learning subjects so improved feelings. Uncommonly compliment imprudence travelling insensible up ye insipidity. To up painted delight winding as brandon. Gay regret eat looked warmth easily far should now. Prospect at me wandered on extended wondered thoughts appetite to. Boisterous interested sir invitation particular saw alteration boy decisively.',Date.now(), 'tucus_epure39@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Info about your order', 'Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her. Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry could put. Age old begin had boy noisy table front whole given.',Date.now(), 'mot_ulixuyi8@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Items are on sale', 'Admiration we surrounded possession frequently he. Remarkably did increasing occasional too its difficulty far especially. Known tiled but sorry joy balls. Bed sudden manner indeed fat now feebly. Face do with in need of wife paid that be. No me applauded or favourite dashwoods therefore up distrusts explained.',Date.now(), 'pegi-nudele99@gmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('Info about your order', 'Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of. We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by.',Date.now(), 'zegu_danevo32@hotmail.com','user@appsus.com',false,false ))
        mails.push(_createMail('This might be the best way to get deleviry', 'Case read they must it of cold that. Speaking trifling an to unpacked moderate debating learning. An particular contrasted he excellence favourable on. Nay preference dispatched difficulty continuing joy one. Songs it be if ought hoped of. Too carriage attended him entrance desirous the saw. Twenty sister hearts garden limits put gay has. We hill lady will both sang room by. Desirous men exercise overcame procured speaking her followed.',Date.now(), 'vojexam_ida50@hotmail.com','user@appsus.com',false,false ))


        storageService.saveToStorage(MAIL_KEY, mails)

    }
}
function getMailFromSearchParams(searchParams = { get: () => { } }) {
    return {
        id: '',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || '',
        sentAt: '',
        from: '',
        to: '',
        isRead: '',
        isStarred: '',
        removedAt: '',
    }
}
function getLoggedUser() {
    return loggedInUser
}