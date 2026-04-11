/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { storage } from "./services/storageService";

// Screens
import SplashScreen from "./screens/Splash";
import OnboardingScreen from "./screens/Onboarding";
import HomeScreen from "./screens/Home";
import CreateRecipientScreen from "./screens/CreateRecipient";
import GuidedSessionScreen from "./screens/GuidedSession";
import ResultsScreen from "./screens/Results";
import IdeaDetailScreen from "./screens/IdeaDetail";
import ShortlistScreen from "./screens/Shortlist";
import SettingsScreen from "./screens/Settings";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const completed = storage.get<boolean>("onboarding_completed");
    setOnboardingCompleted(!!completed);
    
    // Simulate splash delay
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <div className="mobile-container">
        <Routes>
          <Route 
            path="/" 
            element={onboardingCompleted ? <HomeScreen /> : <Navigate to="/onboarding" />} 
          />
          <Route path="/onboarding" element={<OnboardingScreen onComplete={() => setOnboardingCompleted(true)} />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/create-recipient" element={<CreateRecipientScreen />} />
          <Route path="/guided-session/:recipientId" element={<GuidedSessionScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/idea/:id" element={<IdeaDetailScreen />} />
          <Route path="/shortlist" element={<ShortlistScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

