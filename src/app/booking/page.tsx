'use client';

import { Suspense, useState } from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import BookingForm from '@/components/booking/BookingForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookingPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="theme-transition py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
      <Container>
        <SectionHeading
          title={t.booking.title}
          subtitle={submitted ? undefined : t.booking.subtitle}
        />
        <div className="max-w-2xl mx-auto">
          {/* Suspense required because BookingForm uses useSearchParams for the ?ref= prefill */}
          <Suspense fallback={<div className="h-96" />}>
            <BookingForm onSubmitChange={setSubmitted} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
