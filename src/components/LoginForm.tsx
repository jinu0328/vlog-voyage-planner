
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "로그인 성공!",
        description: "환영합니다.",
      });
    } else {
      toast({
        title: "로그인 실패",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="toss-card p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-toss-blue rounded-lg flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-toss-navy">로그인</h2>
        <p className="text-toss-gray-600 mt-2">여행로그에 오신 것을 환영합니다</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        <Button type="submit" className="w-full toss-button" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-toss-gray-600">
          계정이 없으신가요?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-toss-blue hover:text-toss-blue/80 font-medium"
          >
            회원가입
          </button>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;
