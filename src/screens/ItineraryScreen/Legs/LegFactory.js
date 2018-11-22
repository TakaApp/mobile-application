import React from 'react';

import LegWalk from './LegWalk';
import LegTram from './LegTram';
import LegBus from './LegBus';

class LegFactory {
  static build(leg, index) {
    switch (leg.mode) {
      case 'WALK':
        return <LegWalk key={index} leg={leg} index={index} />;
      case 'TRAM':
        return <LegTram key={index} leg={leg} index={index} />;
      case 'BUS':
        return <LegBus key={index} leg={leg} index={index} />;
      default:
        return undefined;
    }
  }
}

export default LegFactory;
