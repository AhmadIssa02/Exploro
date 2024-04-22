import { ApiParam, CoreApi } from '@/utils/api/client'
import { ApiResponse } from '../shared/auth-response'
import { useEffect, useRef } from 'react'

interface EmailResponse {
  success: boolean
}

export class EmailApi extends CoreApi {
  path = '/send-email'
  constructor(param?: ApiParam) {
    super(param)
  }

  async sendEmail({
    receiverEmail,
    message,
  }: {
    receiverEmail: string
    message: string
  }): Promise<ApiResponse<EmailResponse>> {
    const res = await this.client.post<ApiResponse<EmailResponse>>(`${this.path}`, {
      receiverEmail,
      message,
    })
    return res.data
  }
}

export function useEmailApi(param?: ApiParam): EmailApi {
  const ref = useRef<EmailApi>(new EmailApi(param))
  useEffect(() => {
    ref.current = new EmailApi(param)
  }, [param])
  return ref.current
}

