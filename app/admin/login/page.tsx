'use client'

import { useState, useEffect, Suspense } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { EyeOff, Eye, Lock, AlertCircle } from 'lucide-react'

function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    // Check if user is already logged in
    getSession().then(session => {
      if (session?.user) {
        router.push('/admin/dashboard')
      }
    })

    // Check for auth errors in URL
    const authError = searchParams.get('error')
    if (authError) {
      setError('احراز هویت ناموفق. لطفاً دوباره تلاش کنید.')
    }
  }, [router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!email || !password) {
      setError('لطفاً تمام فیلدها را پر کنید')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('ایمیل یا رمز عبور نادرست است')
      } else if (result?.ok) {
        // Successful login, redirect to dashboard
        window.location.href = '/admin/dashboard'
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('خطایی رخ داده است. لطفاً دوباره تلاش کنید.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4'
      dir='rtl'
    >
      <Card className='w-full max-w-md'>
        <CardHeader className='flex flex-col items-center pb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Lock className='w-8 h-8 text-primary' />
            <h1 className='text-2xl font-bold'>پنل مدیریت</h1>
          </div>
          <p className='text-default-500 text-center'>
            برای دسترسی به پنل مدیریت وارد شوید
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              type='email'
              label='ایمیل'
              placeholder='ایمیل خود را وارد کنید'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              variant='bordered'
              isDisabled={isLoading}
            />
            <Input
              label='رمز عبور'
              placeholder='رمز عبور خود را وارد کنید'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              variant='bordered'
              isDisabled={isLoading}
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={toggleVisibility}
                  disabled={isLoading}
                >
                  {isVisible ? (
                    <EyeOff className='w-5 h-5 text-default-400' />
                  ) : (
                    <Eye className='w-5 h-5 text-default-400' />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
            />

            {error && (
              <div className='flex items-center gap-2 text-danger text-sm p-3 bg-danger-50 rounded-lg'>
                <AlertCircle className='w-4 h-4' />
                {error}
              </div>
            )}

            <Button
              type='submit'
              color='primary'
              className='w-full'
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'در حال ورود...' : 'ورود'}
            </Button>

            <div className='text-sm text-center text-default-500 mt-4'>
              <p>حساب‌های آزمایشی:</p>
              <p>
                <strong>سوپر ادمین:</strong> superadmin@ahanhormoz.com /
                superadmin123
              </p>
              <p>
                <strong>ادمین:</strong> admin@ahanhormoz.com / admin123
              </p>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
        <div className='text-center'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto' />
        </div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}
