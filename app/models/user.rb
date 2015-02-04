class User < ActiveRecord::Base

  attr_reader :password

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: {message: "Password can't be blank"}
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    blank_errors = []
    blank_errors.push("Username is blank") if username == ""
    blank_errors.push("Password is blank") if password == ""
    return blank_errors unless blank_errors.empty?
    user = User.find_by_username(username)
    return ["Username is invalid"] if user.nil?
    user.is_password?(password) ? user : ["Password is invalid"]
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

    def ensure_session_token
      self.session_token ||= self.class.generate_session_token
    end

end
