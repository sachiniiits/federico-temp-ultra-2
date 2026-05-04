import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { CreateLedgerEntryDto } from './dto/create-ledger-entry.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { DischargeSummaryDto } from './dto/discharge-summary.dto';

@ApiTags('Billing')
@ApiHeader({ name: 'x-role', description: 'User role' })
@Controller('billing')
export class BillingController {
  private readonly logger = new Logger('💰 Billing');

  constructor(private readonly billingService: BillingService) {}

  @Get('ledger/:admissionId')
  @ApiOperation({ summary: 'Get ledger entries for an admission' })
  @Roles('ADMIN', 'SUPER_USER', 'FA')
  findLedger(@Param('admissionId') admissionId: string) {
    const entries = this.billingService.findLedger(+admissionId);
    this.logger.log(`📒 LEDGER GET  admission_id=${admissionId}  entries=${entries.length}`);
    return entries;
  }

  @Post('ledger/:admissionId')
  @ApiOperation({ summary: 'Add a ledger entry' })
  @Roles('ADMIN', 'SUPER_USER', 'FA')
  addEntry(@Param('admissionId') admissionId: string, @Body() entry: CreateLedgerEntryDto) {
    const result = this.billingService.addLedgerEntry(+admissionId, entry);
    this.logger.log(
      `➕ LEDGER ADD  admission_id=${admissionId}  service="${entry.service_name}"  qty=${entry.qty}  price=₹${entry.price}  tax=₹${entry.tax}`
    );
    return result;
  }

  @Post('receipts')
  @ApiOperation({ summary: 'Create a new receipt' })
  @Roles('ADMIN', 'SUPER_USER', 'FA')
  createReceipt(@Body() receipt: CreateReceiptDto) {
    const result = this.billingService.createReceipt(receipt);
    this.logger.log(
      `🧾 RECEIPT CREATED  id=${result.id}  patient="${receipt.patient}"  uhid=${receipt.uhid}  amount=₹${receipt.amount}  mode=${receipt.mode}  status=${receipt.status}`
    );
    return result;
  }

  @Post('discharge-summary/:admissionId')
  @ApiOperation({ summary: 'Create a discharge summary' })
  @Roles('ADMIN', 'SUPER_USER', 'FA')
  createSummary(@Param('admissionId') admissionId: string, @Body() summary: DischargeSummaryDto) {
    const result = this.billingService.createDischargeSummary(+admissionId, summary);
    this.logger.log(
      `📄 DISCHARGE SUMMARY  admission_id=${admissionId}  followUp="${summary.followUp}"`
    );
    return result;
  }

  @Get('receipts')
  @ApiOperation({ summary: 'Get all receipts' })
  @Roles('ADMIN', 'SUPER_USER', 'FA')
  findAllReceipts() {
    const receipts = this.billingService.findAllReceipts();
    this.logger.log(`🧾 RECEIPTS LIST  total=${receipts.length}`);
    return receipts;
  }
}
