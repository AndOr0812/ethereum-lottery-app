import {Inject, Injectable} from '@angular/core';
import { WEB3 } from './web3';
import Web3 from 'web3';
import {bindNodeCallback} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';
import {environment} from '../environments/environment';

@Injectable()
export class MetaMaskService {

  ORACLE_ABI: any = [
    {
      constant: false,
      inputs: [
        {
          name: 'queryId',
          type: 'bytes32'
        },
        {
          name: 'result',
          type: 'string'
        }
      ],
      name: '__callback',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_myid',
          type: 'bytes32'
        },
        {
          name: '_result',
          type: 'string'
        },
        {
          name: '_proof',
          type: 'bytes'
        }
      ],
      name: '__callback',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_activateTestMode',
          type: 'bool'
        }
      ],
      name: 'activateTestMode',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'generateRandomNumber',
      outputs: [
        {
          name: '',
          type: 'bytes32'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '',
          type: 'uint256'
        }
      ],
      name: 'Log',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'QuerySentEvent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'QueryNotSentEvent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'QueryFinishedEvent',
      type: 'event'
    },
    {
      constant: false,
      inputs: [],
      name: 'retrieveProfit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback'
    },
    {
      inputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'constructor'
    },
    {
      constant: true,
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'queryId',
          type: 'bytes32'
        }
      ],
      name: 'getRandomNumber',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'queryId',
          type: 'bytes32'
        }
      ],
      name: 'isQueryProcessed',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ];

  LOTTERY_ABI: any = [
    {
      constant: true,
      inputs: [],
      name: 'getCurrentRoundStart',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'checkWinnings',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'drawWinningNumbers',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'closeLottery',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCurrentRoundEnd',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'endRound',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getRoundDuration',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getJackpot',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_roundStart',
          type: 'uint256'
        }
      ],
      name: 'getWinningNumbersForRoundStart',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_account',
          type: 'address'
        }
      ],
      name: 'getTicketsForAddress',
      outputs: [
        {
          components: [
            {
              name: 'chosenNumbers',
              type: 'string'
            },
            {
              name: 'roundStart',
              type: 'uint256'
            },
            {
              name: 'ticketOwner',
              type: 'address'
            }
          ],
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getTimeLeft',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_oracleFee',
          type: 'uint256'
        }
      ],
      name: 'adjustOracleFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_chosenNumbers',
          type: 'string'
        }
      ],
      name: 'buyTicket',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          name: '_oracle',
          type: 'address'
        },
        {
          name: '_roundDuration',
          type: 'uint256'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'constructor'
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'RoundStartEvent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'ProvideOracleFeeEvent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'UnfinishedBatchProcessingEvent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'description',
          type: 'string'
        }
      ],
      name: 'PayoutEvent',
      type: 'event'
    }
  ];

  public currentNetwork: string;

  public oracleContract: any;
  public lotteryContract: any;

  public async buyTicket(numbers: string) {
    const accounts = await this.web3.eth.getAccounts();
    const transactionObj = await this.getTransactionObject(accounts[0], 5000000, 20000000000000000);
    await this.lotteryContract.methods.buyTicket(numbers).send(transactionObj);
  }

  public async drawWinningNumbers() {
    const accounts = await this.web3.eth.getAccounts();
    const transactionObj = await this.getTransactionObject(accounts[0], 5000000, 0);
    await this.lotteryContract.methods.drawWinningNumbers().send(transactionObj);
  }

  public async checkWinnings() {
    const accounts = await this.web3.eth.getAccounts();
    const transactionObj = await this.getTransactionObject(accounts[0], 5000000, 0);
    await this.lotteryContract.methods.checkWinnings().send(transactionObj);
  }

  constructor(@Inject(WEB3) private web3: Web3) {
  }

  async init() {
    this.currentNetwork = await this.web3.eth.net.getNetworkType();
    switch (this.currentNetwork) {
      case 'main':
        this.oracleContract = await new this.web3.eth.Contract(this.ORACLE_ABI, environment.mainOracleAddress);
        this.lotteryContract = await new this.web3.eth.Contract(this.LOTTERY_ABI, environment.mainLotteryAddress);
        break;
      case 'ropsten':
        this.oracleContract = await new this.web3.eth.Contract(this.ORACLE_ABI, environment.ropstenOracleAddress);
        this.lotteryContract = await new this.web3.eth.Contract(this.LOTTERY_ABI, environment.ropstenLotteryAddress);
        break;
      case 'private':
        this.oracleContract = await new this.web3.eth.Contract(this.ORACLE_ABI, environment.privateOracleAddress);
        this.lotteryContract = await new this.web3.eth.Contract(this.LOTTERY_ABI, environment.privateLotteryAddress);
        break;
    }

  }

  async getTransactionObject(FROM: string, GAS: number, VALUE: number) {
    return {
      from: FROM,
      gas: GAS,
      value: VALUE
    };
  }
}
