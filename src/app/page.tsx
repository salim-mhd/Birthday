import HeroSection from '@/components/HeroSection';
import MomentsGallery from '@/components/MomentsGallery';
import HerFavorites from '@/components/HerFavorites';
import HydrationCare from '@/components/HydrationCare';
import ProposalGame from '@/components/ProposalGame';
import SurpriseGiftStation from '@/components/SurpriseGiftStation';
import ReasonsList from '@/components/ReasonsList';
import LoveLetterThankYou from '@/components/LoveLetterThankYou';
import LoveGuestbook from '@/components/LoveGuestbook';
import Footer from '@/components/Footer';
import FloatingHearts from '@/components/FloatingHearts';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Whimsical Background Particles & Lights */}
      <FloatingHearts />

      {/* Romantic Music Player Floating Widget */}
      <BackgroundMusic />

      {/* Hero: 21st Greeting & Blow Candles */}
      <HeroSection />

      {/* Moments Gallery: Photos & Salim's Whispers */}
      <MomentsGallery />

      {/* Things She Loves: Chocolates, Ice Cream, Night Rides, Biriyani */}
      <HerFavorites />

      {/* Caring Hydration Check: Drink Water For Care */}
      <HydrationCare />

      {/* The Proposal Game: Will You Marry Me? Dodging "No" */}
      <ProposalGame />

      {/* Surprise Gift Boutique: Anklet, Kiss, Hug, Chocolates, Belly Chain, Rose */}
      <SurpriseGiftStation />

      {/* 21 Reasons Why I Love Sayana */}
      <ReasonsList />

      {/* Thank You For Coming Into My Life (Love Letter) */}
      <LoveLetterThankYou />

      {/* Live Love Notes Wall (MongoDB Powered) */}
      <LoveGuestbook />

      {/* Romantic Footer */}
      <Footer />
    </main>
  );
}

