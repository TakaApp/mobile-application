import React from 'react';

import LegWalk from './LegWalk';
import LegTram from './LegTram';
import LegBus from './LegBus';

class LegFactory {
  static build(leg, index, stopDetails) {
    switch (leg.mode) {
      case 'WALK':
        return <LegWalk key={index} leg={leg} index={index} />;
      case 'TRAM':
        return <LegTram key={index} leg={leg} index={index} stopDetails={stopDetails} />;
      case 'BUS':
        return <LegBus key={index} leg={leg} index={index} stopDetails={stopDetails} />;
      default:
        return undefined;
    }
  }
}

export default LegFactory;
