import styled from 'styled-components';

const Item = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  color: #343a40;
  border-radius: 4px;

  :before {
    content: '';
    float: left;
    padding-bottom: 100%;
  }

  &.muted {
    background: #f8f9fa;
    color: #6c757d;
  }

  &:hover {
    text-decoration: none;
    background: #e2e6ea;
    color: #343a40;
  }

  &.active {
    background: #007bff;
    color: #fff;
    &:hover {
      background: #0069d9;
    }
  }

  &.today {
    :after {
      content: '';
      display: block;
      border: 0 solid transparent;
      border-bottom-width: 7px;
      border-left-width: 7px;
      border-bottom-color: #007bff;
      position: absolute;
      bottom: 4px;
      right: 4px;
    }
    &.active:after {
      border-bottom-color: #fff;
    }
  }
`;

const Wrapper = styled.div`
  min-width: 230px;
`;

export { Item, Wrapper };
