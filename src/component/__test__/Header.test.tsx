import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';

describe('* 기본 렌더링 테스트', () => {
  const { container } = render(<Header />);

  it('Snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('* Required prop: title 테스트', () => {
  context('- title 값이으로 string/number 값이 전달된 경우', () => {
    it('title 값이 정상적으로 dom 에 존재한다', () => {
      const title = 'test title';
      const { container } = render(<Header title={title} />);
      expect(container).toHaveTextContent(title);
    });
  });
  context('- title 값이 전달되지 않은 경우', () => {
    it('title 값이 정상적으로 dom 에 존재한다', () => {
      const { container } = render(<Header />);
      console.log(container.children.length, container.children);
      expect(container.children[0]).toHaveTextContent('Header');
    });
  });
});

/*
describe('* Required Prop: animation 테스트', () => {
  context(`- animation 값으로 'fade-in' 이 전달 된 경우`, () => {
    it(`css animation attribute 값에 'fade-in'이 반영된다`, () => {
      const { container } = render(<AnimationWrapper animation="fade-in" />);
      expect(container.children[0]).toHaveStyle(
        'animation: fade-in 0.5s 0s forwards'
      );
    });
  });

  context(`- animation 값으로 'fade-out' 이 전달 된 경우`, () => {
    it(`css animation attribute 값에 'fade-out'이 반영된다`, () => {
      const { container } = render(<AnimationWrapper animation="fade-out" />);
      expect(container.children[0]).toHaveStyle(
        'animation: fade-out 0.5s 0s forwards'
      );
    });
  });

  context(`- animation 값으로 custom keyframes 값이 전달 된 경우`, () => {
    const customKeyframes: Keyframes = keyframes`
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    `;
    it(`css animation attribute 값에 정의한 custom keyframes의 name value가 반영된다`, () => {
      const { container } = render(
        <AnimationWrapper animation={customKeyframes} />
      );
      expect(container.children[0]).toHaveStyle(
        `animation: ${customKeyframes.getName()} 0.5s 0s forwards`
      );
    });
  });
});

describe('* Optional Prop: skipAnimation 테스트', () => {
  // skipAnimation 값으로 false(default) 값이 전달 된 경우는
  // Required Prop: animation 테스트에 포함되는 개념으로 생략한다.
  context(`- skipAnimation 값으로 true 값이 전달 된 경우`, () => {
    it(`css 에 animation attribute가 적용되지 않는다.`, () => {
      const { container } = render(
        <AnimationWrapper skipAnimation animation="fade-in" />
      );
      expect(container.children[0]).not.toHaveStyle(
        'animation: fade-in 0.5s 0s forwards'
      );
    });
  });
});

describe('* Optional Prop: delay 테스트', () => {
  // delay 값으로 undefined(default) 값이 전달 된 경우는
  // 지난 테스트에 포함되는 개념으로 생략한다.
  context(`- delay 값으로 0 이상의 값이 number 로 전달 된 경우`, () => {
    const delay = 5;
    it(`css 에 animation 의 delay 값이 default 값 0이 아닌 delay 값으로 반영된다`, () => {
      const { container } = render(
        <AnimationWrapper delay={delay} animation="fade-in" />
      );
      expect(container.children[0]).toHaveStyle(
        `animation: fade-in 0.5s ${delay}s forwards`
      );
    });
  });

  context(`- delay 값으로 0 이상의 값이 string으로 전달 된 경우`, () => {
    const delay = '5';
    it(`css 에 animation 의 delay 값이 default 값 0이 아닌 delay 값으로 반영된다`, () => {
      const { container } = render(
        <AnimationWrapper delay={delay} animation="fade-in" />
      );
      expect(container.children[0]).toHaveStyle(
        `animation: fade-in 0.5s ${delay}s forwards`
      );
    });
  });
});

describe('* Optional Prop: duration 테스트', () => {
  // duration 값으로 undefined(default) 값이 전달 된 경우는
  // 지난 테스트에 포함되는 개념으로 생략한다.
  context(`- duration 값으로 0 이상의 값이 number 로 전달 된 경우`, () => {
    const duration = 5;
    it(`css 에 animation 의 duration 값이 default 값 0.5가 아닌 duration 값으로 반영된다`, () => {
      const { container } = render(
        <AnimationWrapper duration={duration} animation="fade-in" />
      );
      expect(container.children[0]).toHaveStyle(
        `animation: fade-in ${duration}s 0s forwards`
      );
    });
  });

  context(`- duration 값으로 0 이상의 값이 string으로 전달 된 경우`, () => {
    const duration = '5';
    it(`css 에 animation 의 duration 값이 default 값 0.5가 아닌 duration 값으로 반영된다`, () => {
      const { container } = render(
        <AnimationWrapper duration={duration} animation="fade-in" />
      );
      expect(container.children[0]).toHaveStyle(
        `animation: fade-in ${duration}s 0s forwards`
      );
    });
  });
});

describe('* Optional Prop: fillMode 테스트', () => {
  // fillMode 값으로 undefined(default) 값이 전달 된 경우는
  // 지난 테스트에 포함되는 개념으로 생략한다.
  context(`- fillMode 값으로 'backwards' 가 전달 된 경우`, () => {
    const fillMode = 'backwards';
    it(`css 에 animation 의 fillMode 값이 default 값 'forwards'가 아닌 fillMode 값으로 반영된다`, () => {
      const { container } = render(
        <AnimationWrapper fillMode={fillMode} animation="fade-in" />
      );
      expect(container.children[0]).toHaveStyle(
        `animation: fade-in 0.5s 0s ${fillMode}`
      );
    });
  });
});

describe('* Optional Prop: defaultCss 테스트', () => {
  const defaultCss = {
    display: 'flex',
    flexDirection: 'row',
  };
  it(`css 에 defaultCss로 넘어온 값들이 반영된다`, () => {
    const { container } = render(
      <AnimationWrapper defaultCss={defaultCss} animation="fade-in" />
    );
    expect(container.children[0]).toHaveStyle(defaultCss);
  });
});

describe('* Optional Prop: onAfter 테스트', () => {
  context(`- delay가 undefined(default) 인 경우`, () => {
    const onAfter = jest.fn();
    it(`기본 delay 값인 500ms 뒤에 실행된다`, () => {
      render(<AnimationWrapper onAfter={onAfter} animation="fade-in" />);
      expect(onAfter).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);
      expect(onAfter).toHaveBeenCalled();
    });
  });
  context(`- delay가 0인 경우`, () => {
    const onAfter = jest.fn();
    it(`delay가 0인 경우 기본 delay 값인 500ms 뒤에 실행`, () => {
      render(
        <AnimationWrapper onAfter={onAfter} delay={0} animation="fade-in" />
      );
      expect(onAfter).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);
      expect(onAfter).toHaveBeenCalled();
    });
  });
  context(`- delay > 0인 경우`, () => {
    const onAfter = jest.fn();
    const delay = 1000;
    it(`delay가 0인 경우 delay 값 이후에 실행`, () => {
      render(
        <AnimationWrapper onAfter={onAfter} delay={delay} animation="fade-in" />
      );
      expect(onAfter).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(onAfter).toHaveBeenCalled();
    });
  });
});
*/
