import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { PlusCircle, DollarSign, PieChart, LogOut } from 'lucide-react';
import type { Expense } from './types/database';
import type { User } from '@supabase/supabase-js';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setSignInError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: 'testuser1',
      password: 'testpass1'
    });

    if (error) {
      setSignInError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <h2 className="text-sm font-medium text-blue-800 mb-2">Test Account Credentials</h2>
              <div className="text-sm text-blue-700">
                <p><strong>Username:</strong> testuser1</p>
                <p><strong>Password:</strong> testpass1</p>
              </div>
            </div>
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
            {signInError && (
              <p className="text-red-600 text-sm text-center">{signInError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Expense Tracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <PlusCircle className="h-5 w-5" />
                <span>Add Expense</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <PieChart className="h-5 w-5" />
                <span>Charts</span>
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats cards will go here */}
        </div>
      </main>
    </div>
  );
}

export default App;