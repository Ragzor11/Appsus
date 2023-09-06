import {mailService} from '../services/mail.service.js'
import {showSuccessMsg, showErrorMsg} from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
const { useEffect, useState, Fragment } = React
const { Outlet, useSearchParams, useParams } = ReactRouterDOM

export function MailIndex() {
    return <Fragment>
        <main className='mail-index '>
            <MailList/>
        </main>







    </Fragment>
}

