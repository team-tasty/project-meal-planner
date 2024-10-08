

export const authFns = {
  sessionCheck: async (req, res) => {
    if (req.session.userId) {
      return res.send({
        message: 'User is in session',
        success: true,
        userId: req.session.userId
      });
    } else {
      return res.send({
        message: 'No user in session',
        success: false
      });
    };
  },

  register: async (req, res) => {

  },

  login: async (req, res) => {

  },

  logout: async (req, res) => {

  }
}