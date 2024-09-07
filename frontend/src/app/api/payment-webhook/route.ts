import { Env } from '@/common/env';
import { NextResponse } from 'next/server';
import crypto from 'crypto'

export async function POST(request: Request) {
    const clonedRequest = request.clone()
    const eventType = request.headers.get("X-Event-Name")
    const body = await request.json()

    // check signature 

    const secret = Env.lemonSqueezyWebhookSignature;
    const hmac = crypto.createHmac('sha256', secret)

    const digest = new Uint8Array(Buffer.from(hmac.update(await clonedRequest.text()).digest('hex')))
    const signature = new Uint8Array(Buffer.from(request.headers.get("X-Signature") || '', 'utf-8'))

    if (!crypto.timingSafeEqual(digest, signature)) {
        console.log('invalid signature')
        return NextResponse.json({isValid: false })
    } else {
        console.log('valid signature')
    }

    switch (eventType) {
        case 'order_created':
            console.log('order created')
            break
        case 'order.updated':
            console.log('order updated')
            break
    }
    return NextResponse.json({ isValid: true })
}