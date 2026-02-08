export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405, headers: corsHeaders });
        }

        // ============================================
        // 1. EMAIL ENDPOINT
        // ============================================
        if (url.pathname === '/send-email') {
            try {
                const body = await request.json();

                if (!body.name || !body.email || !body.message) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Missing required fields'
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders },
                    });
                }

                const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        service_id: 'service_l1188zm',
                        template_id: 'template_8gb00yc',
                        user_id: 'kqIwpdQVhJXCBBT8q',
                        accessToken: 'JHMYeZC-IEZMKi9TT4KQS',
                        template_params: {
                            name: body.name,
                            from_name: body.name,
                            from_email: body.email,
                            message: body.message,
                            to_name: 'Selva G'
                        }
                    })
                });

                if (!emailResponse.ok) {
                    const errorText = await emailResponse.text();
                    console.error('EmailJS Error:', errorText);
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Failed to send email',
                        details: errorText
                    }), {
                        status: emailResponse.status,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders },
                    });
                }

                const result = await emailResponse.text();
                return new Response(JSON.stringify({
                    success: true,
                    message: 'Email sent successfully',
                    result
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });

            } catch (error) {
                console.error('Send email error:', error);
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });
            }
        }

        // ============================================
        // 2. AUDIO TRANSCRIPTION ENDPOINT (Sarvam STT)
        // ============================================
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            try {
                const formData = await request.formData();
                const audioFile = formData.get('file');

                if (!audioFile) {
                    return new Response(JSON.stringify({ error: 'No audio file provided' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders },
                    });
                }

                // Forward to Sarvam AI Speech-to-Text
                const sarvamFormData = new FormData();
                sarvamFormData.append('file', audioFile);
                sarvamFormData.append('model', 'saarika:v1');
                // 'unknown' enables auto-detection for Hindi, English, Tamil, etc.
                sarvamFormData.append('language_code', 'unknown');

                const sttResponse = await fetch('https://api.sarvam.ai/speech-to-text', {
                    method: 'POST',
                    headers: {
                        'api-subscription-key': env.SARVAM_API_KEY,
                    },
                    body: sarvamFormData,
                });

                if (!sttResponse.ok) {
                    const errorText = await sttResponse.text();
                    console.error('Sarvam STT Error:', errorText);
                    return new Response(JSON.stringify({
                        error: 'Transcription failed',
                        details: errorText
                    }), {
                        status: sttResponse.status,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders },
                    });
                }

                const sttData = await sttResponse.json();
                return new Response(JSON.stringify(sttData), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });

            } catch (error) {
                console.error('STT Error:', error);
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });
            }
        }

        // ============================================
        // 3. CHAT COMPLETIONS ENDPOINT (Sarvam LLM)
        // ============================================
        try {
            const body = await request.json();

            const messages = [
                { role: 'system', content: body.systemPrompt }
            ];
            messages.push(...body.conversationHistory);

            const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-subscription-key': env.SARVAM_API_KEY
                },
                body: JSON.stringify({
                    model: body.model || 'sarvam-m',
                    messages: messages,
                    temperature: body.temperature || 0.7,
                })
            });

            const data = await response.json();
            return new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }
    },
};
