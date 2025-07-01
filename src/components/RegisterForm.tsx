
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await register(email, password, name);
    
    if (result.success) {
      toast({
        title: "회원가입 성공!",
        description: "환영합니다! 로그인되었습니다.",
      });
    } else {
      toast({
        title: "회원가입 실패",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="toss-card p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-toss-blue rounded-lg flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-toss-navy">회원가입</h2>
        <p className="text-toss-gray-600 mt-2">새로운 계정을 만들어보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </div>

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
            placeholder="비밀번호를 입력하세요 (6자 이상)"
            required
            minLength={6}
          />
        </div>

        <Button type="submit" className="w-full toss-button" disabled={loading}>
          {loading ? '가입 중...' : '회원가입'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-toss-gray-600">
          이미 계정이 있으신가요?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-toss-blue hover:text-toss-blue/80 font-medium"
          >
            로그인
          </button>
        </p>
      </div>
    </Card>
  );
};

export default RegisterForm;
