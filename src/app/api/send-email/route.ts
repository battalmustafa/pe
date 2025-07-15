import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, formData } = body;

    let subject = '';
    let html = '';

    switch (type) {
      case 'hizli-basvuru':
        subject = 'Yeni Hızlı Başvuru Formu';
        html = `
          <h2>Yeni Hızlı Başvuru</h2>
          <p><strong>Ad:</strong> ${formData.ad}</p>
          <p><strong>Soyad:</strong> ${formData.soyad}</p>
          <p><strong>E-posta:</strong> ${formData.email}</p>
          <p><strong>Telefon:</strong> ${formData.telefon}</p>
          <p><strong>Seçilen Programlar:</strong></p>
          <ul>
            ${formData.secilenProgramlar.map((program: string) => `<li>${program}</li>`).join('')}
          </ul>
        `;
        break;

      case 'iletisim':
        subject = `İletişim Formu: ${formData.subject}`;
        html = `
          <h2>İletişim Formu Mesajı</h2>
          <p><strong>Ad:</strong> ${formData.name}</p>
          <p><strong>E-posta:</strong> ${formData.email}</p>
          <p><strong>Konu:</strong> ${formData.subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${formData.message}</p>
          <p><strong>Bülten Aboneliği:</strong> ${formData.newsletter ? 'Evet' : 'Hayır'}</p>
        `;
        break;

      case 'kurgu-santiyesi-kayit':
        subject = 'Kurgu Şantiyesi Kayıt Formu';
        html = `
          <h2>Kurgu Şantiyesi Kayıt</h2>
          <p><strong>Ad:</strong> ${formData.ad}</p>
          <p><strong>Soyad:</strong> ${formData.soyad}</p>
          <p><strong>Telefon:</strong> ${formData.telefon}</p>
          <p><strong>E-posta:</strong> ${formData.email}</p>
          <p><strong>Örnek Hikaye:</strong></p>
          <p style="white-space: pre-wrap;">${formData.ornekHikaye}</p>
        `;
        break;

      case 'workshop-registration':
        subject = `Atölye Kaydı: ${formData.workshopTitle}`;
        html = `
          <h2>Atölye Kaydı</h2>
          <p><strong>Atölye:</strong> ${formData.workshopTitle}</p>
          <p><strong>Atölye ID:</strong> ${formData.workshopId}</p>
          <hr>
          <p><strong>Ad:</strong> ${formData.ad}</p>
          <p><strong>Soyad:</strong> ${formData.soyad}</p>
          <p><strong>Telefon:</strong> ${formData.telefon}</p>
          <p><strong>E-posta:</strong> ${formData.email}</p>
        `;
        break;

      case 'newsletter':
        subject = 'Yeni Bülten Aboneliği';
        html = `
          <h2>Yeni Bülten Aboneliği</h2>
          <p><strong>E-posta:</strong> ${formData.email}</p>
          <p><strong>Kayıt Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>
        `;
        break;

      default:
        return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Pınar Eğilmez Website <noreply@pinaregilmez.com>',
      to: ['pinaregilmezmanagement@gmail.com'],
      subject: subject,
      html: html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 