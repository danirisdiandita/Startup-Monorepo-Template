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
            console.log('Order created:', body.data.attributes);
            // Handle order creation logic here
            break;
        case 'order_refunded':
            console.log('Order refunded:', body.data.attributes);
            // Handle order refund logic here
            break;
        case 'subscription_created':
            console.log('Subscription created:', body.data.attributes);
            // Handle new subscription logic here
            break;
        case 'subscription_updated':
            console.log('Subscription updated:', body.data.attributes);
            // Handle subscription update logic here
            break;
        case 'subscription_cancelled':
            console.log('Subscription cancelled:', body.data.attributes);
            // Handle subscription cancellation logic here
            break;
        case 'subscription_resumed':
            console.log('Subscription resumed:', body.data.attributes);
            // Handle subscription resumption logic here
            break;
        case 'subscription_expired':
            console.log('Subscription expired:', body.data.attributes);
            // Handle subscription expiration logic here
            break;
        case 'subscription_paused':
            console.log('Subscription paused:', body.data.attributes);
            // Handle subscription pause logic here
            break;
        case 'subscription_unpaused':
            console.log('Subscription unpaused:', body.data.attributes);
            // Handle subscription unpause logic here
            break;
        case 'subscription_payment_failed':
            console.log('Subscription payment failed:', body.data.attributes);
            // Handle failed subscription payment logic here
            break;
        case 'subscription_payment_success':
            console.log('Subscription payment successful:', body.data.attributes);
            // Handle successful subscription payment logic here
            break;
        case 'subscription_payment_recovered':
            console.log('Subscription payment recovered:', body.data.attributes);
            // Handle recovered subscription payment logic here
            break;
        case 'license_key_created':
            console.log('License key created:', body.data.attributes);
            // Handle license key creation logic here
            break;
        case 'license_key_updated':
            console.log('License key updated:', body.data.attributes);
            // Handle license key update logic here
            break;
        case 'order_created':
            console.log('order created')
            break
        case 'order.updated':
            console.log('order updated')
            break
    }
    return NextResponse.json({ isValid: true })
}