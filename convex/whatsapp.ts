import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendBookingNotification = action({
    args: {
        clientName: v.string(),
        serviceName: v.string(),
        date: v.string(),
        time: v.string(),
    },
    handler: async (ctx, args) => {
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneNumberId = "1012737105254289";
        const rawRecipient = process.env.BARBER_WHATSAPP_NUMBER;

        if (!accessToken || !rawRecipient) {
            console.error("❌ Configurações de WhatsApp ausentes (Token ou Número do Barbeiro)");
            return;
        }

        // Limpa o número (remove +, espaços, parênteses)
        const recipientNumber = rawRecipient.replace(/\D/g, "");

        const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

        // MENSAGEM PERSONALIZADA: Agora que o Biel abriu a janela de 24h mandando um "Oi", 
        // a Meta permite enviar mensagens de texto livre personalizadas.
        const messageText = `⚡ *Novo Agendamento!* ⚡\n\n👤 *Cliente:* ${args.clientName}\n✂️ *Serviço:* ${args.serviceName}\n📅 *Data:* ${args.date}\n⏰ *Hora:* ${args.time}\n\n_Confira os detalhes no seu painel administrativo._`;

        const body = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: recipientNumber,
            type: "text",
            text: {
                body: messageText,
            },
        };

        try {
            console.log(`📡 Tentando enviar mensagem para ${recipientNumber}...`);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("❌ Erro da API do WhatsApp:", JSON.stringify(data, null, 2));

                // Se o erro for sobre a janela de 24h, avisa no log
                if (data.error?.code === 131047) {
                    console.error("💡 DICA: A janela de 24h está fechada. O Biel precisa mandar um 'Oi' para o bot primeiro.");
                }
            } else {
                console.log("✅ Notificação de WhatsApp enviada com sucesso!");
            }
        } catch (error) {
            console.error("❌ Erro na requisição da API do WhatsApp:", error);
        }
    },
});
