import { Module } from '@nestjs/common'
import { MailService } from './infrastructure/service/main.service'

@Module({
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
