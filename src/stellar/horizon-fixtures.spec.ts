import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface HorizonTransactionFixture {
  hash: string;
  successful: boolean;
  ledger_attr: number;
  result_codes: { transaction: string };
}

function loadFixture(name: string): HorizonTransactionFixture {
  return JSON.parse(
    readFileSync(join(process.cwd(), 'test/fixtures/horizon', name), 'utf8'),
  ) as HorizonTransactionFixture;
}

describe('Horizon response fixtures', () => {
  it('keeps the successful response deterministic and safe for tests', () => {
    const fixture = loadFixture('transaction-success.json');
    expect(fixture).toEqual({
      hash: 'a'.repeat(64),
      successful: true,
      ledger_attr: 777,
      result_codes: { transaction: '' },
    });
  });

  it('represents a rejected transaction without live network data', () => {
    const fixture = loadFixture('transaction-failed.json');
    expect(fixture.successful).toBe(false);
    expect(fixture.result_codes.transaction).toBe('tx_insufficient_balance');
    expect(fixture.hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
