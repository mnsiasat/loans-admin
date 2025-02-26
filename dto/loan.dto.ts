import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'
import { Loan, Status } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class CreateLoanDto implements Partial<Loan> {
  @IsNotEmpty()
  @IsString()
  applicantName!: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  requestedAmount!: Decimal
}

export class UpdateLoanDto implements Partial<Loan> {
  applicantName?: string
  requestedAmount?: Decimal
  status?: Status
}
